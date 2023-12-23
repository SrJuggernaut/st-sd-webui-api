import { generateImage, uploadImage } from './api.js'
import { base64ToDataUrl, checkBooleanString, checkFloatString, checkIntegerString } from './utilities.js'

export const registerCommands = () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { extensionSettings } = sillyTavernContext.extensionSettings.stSdWebuiApiSettings
  const imagenHelperText = 'Generate an image using the Stable Diffusion Web UI API. To see the list of available options, use <code>/imagen help</code>'
  const command = extensionSettings.command === undefined || typeof extensionSettings.command !== 'string' || extensionSettings.command === '' ? 'imagen' : extensionSettings.command
  const commandAlias = extensionSettings.commandAlias === undefined || typeof extensionSettings.commandAlias !== 'string' || extensionSettings.commandAlias === '' ? [] : extensionSettings.commandAlias.split(',').map(alias => alias.trim())
  const interruptGeneration = extensionSettings.interruptGeneration === undefined || typeof extensionSettings.interruptGeneration !== 'boolean' ? true : extensionSettings.interruptGeneration
  const purgeCommand = extensionSettings.purgeCommand === undefined || typeof extensionSettings.purgeCommand !== 'boolean' ? true : extensionSettings.purgeCommand
  sillyTavernContext.registerSlashCommand(command, imageGeneration, commandAlias, imagenHelperText, interruptGeneration, purgeCommand)
}

export const imageGeneration = async (args, value) => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const characterId = sillyTavernContext.characterId !== undefined ? sillyTavernContext.characterId : undefined
  const characterName = characterId !== undefined && sillyTavernContext.characters[characterId] !== undefined ? sillyTavernContext.characters[characterId].name : 'Unknown'

  if (value === undefined || value === '') {
    sillyTavernContext.executeSlashCommands('/echo title="SillyTavern Stable Diffusion Webui API" severity=warning You must provide a prompt, aborting image generation')
    return
  }
  if (value === 'help') {
    const temporalLink = document.createElement('a')
    temporalLink.href = 'https://github.com/SrJuggernaut/st-sd-webui-api#usage'
    temporalLink.target = '_blank'
    temporalLink.click()
    return
  }
  const { generationSettings } = sillyTavernContext.extensionSettings.stSdWebuiApiSettings
  const composedGenerationSettings = {
    prompt: value.trim(),
    negative_prompt: args.negativePrompt !== undefined ? args.negativePrompt : generationSettings.negativePrompt,
    styles: args.styles !== undefined ? args.styles.split(',').map(style => style.trim()) : generationSettings.styles,
    seed: args.seed !== undefined ? checkIntegerString(args.seed, generationSettings.seed) : generationSettings.seed,
    sampler_name: args.samplerName !== undefined ? args.samplerName : generationSettings.sampler_name,
    batch_size: args.batchSize !== undefined ? checkIntegerString(args.batchSize, generationSettings.batch_size) : generationSettings.batch_size,
    steps: args.steps !== undefined ? checkIntegerString(args.steps, generationSettings.steps) : generationSettings.steps,
    cfg_scale: args.cfgScale !== undefined ? checkFloatString(args.cfgScale, generationSettings.cfg_scale) : generationSettings.cfg_scale,
    width: args.width !== undefined ? checkIntegerString(args.width, generationSettings.width) : generationSettings.width,
    height: args.height !== undefined ? checkIntegerString(args.height, generationSettings.height) : generationSettings.height,
    restore_faces: args.restoreFaces !== undefined ? checkBooleanString(args.restoreFaces, generationSettings.restore_faces) : generationSettings.restore_faces,
    enable_hr: args.enableHr !== undefined ? checkBooleanString(args.enableHr, generationSettings.enable_hr) : generationSettings.enable_hr,
    hr_scale: args.hrScale !== undefined ? checkIntegerString(args.hrScale, generationSettings.hr_scale) : generationSettings.hr_scale,
    hr_upscaler: args.hrUpscaler !== undefined ? args.hrUpscaler : generationSettings.hr_upscaler,
    hr_second_pass_steps: args.hrSecondPassSteps !== undefined ? checkIntegerString(args.hrSecondPassSteps, generationSettings.hr_second_pass_steps) : generationSettings.hr_second_pass_steps,
    hr_resize_x: args.hrResizeX !== undefined ? checkIntegerString(args.hrResizeX, generationSettings.hr_resize_x) : generationSettings.hr_resize_x,
    hr_resize_y: args.hrResizeY !== undefined ? checkIntegerString(args.hrResizeY, generationSettings.hr_resize_y) : generationSettings.hr_resize_y,
    hr_sampler_name: args.hrSamplerName !== undefined ? args.hrSamplerName : generationSettings.hr_sampler_name,
    hr_prompt: args.hrPrompt !== undefined ? args.hrPrompt : generationSettings.hr_prompt,
    hr_negative_prompt: args.hrNegativePrompt !== undefined ? args.hrNegativePrompt : generationSettings.hr_negative_prompt,
    denoising_strength: args.denoisingStrength !== undefined ? checkFloatString(args.denoisingStrength, generationSettings.denoising_strength) : generationSettings.denoising_strength,
    refiner_checkpoint: args.refinerCheckpoint !== undefined ? args.refinerCheckpoint : generationSettings.refiner_checkpoint,
    refiner_switch_at: args.refinerSwitchAt !== undefined ? checkFloatString(args.refinerSwitchAt, generationSettings.refiner_switch_at) : generationSettings.refiner_switch_at,
    do_not_save_samples: args.doNotSaveSamples !== undefined ? checkBooleanString(args.doNotSaveSamples, generationSettings.do_not_save_samples) : generationSettings.do_not_save_samples,
    do_not_save_grid: args.doNotSaveGrid !== undefined ? checkBooleanString(args.doNotSaveGrid, generationSettings.do_not_save_grid) : generationSettings.do_not_save_grid,
    save_images: args.saveImages !== undefined ? checkBooleanString(args.saveImages, generationSettings.save_images) : generationSettings.save_images,
    send_images: args.sendImages !== undefined ? checkBooleanString(args.sendImages, generationSettings.send_images) : generationSettings.send_images
  }

  const response = await generateImage(composedGenerationSettings)

  const imagesDataUrls = response.images.map(image => base64ToDataUrl(image))

  const uploads = await Promise.allSettled(imagesDataUrls.map(imageDataUrl => uploadImage(imageDataUrl, characterName)))

  const uploadResults = uploads.map(upload => upload.value.path)

  uploadResults.forEach((uploadResult, index) => {
    const message = {
      name: characterName,
      is_user: false,
      is_system: true,
      send_date: new Date().toISOString(),
      mes: `image: ${response.info.all_prompts[index]}}`,
      extra: {
        image: uploadResult,
        title: response.info.infotexts[index]
      }
    }
    sillyTavernContext.chat.push(message)
    sillyTavernContext.addOneMessage(message)
  })
  sillyTavernContext.saveChat()
}
