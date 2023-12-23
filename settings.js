import { getCurrentModel, getModels, getSamplers, getUpScalers, scanModels, setModel } from './api.js'
import { DEFAULT_API_URL, DEFAULT_EXTENSION_SETTINGS, DEFAULT_GENERATION_SETTINGS, EXTENSION_ID } from './definitions.js'

export const setupSettings = async () => {
  console.log('st-sd-webui-api[settings]: setting up settings...')
  // clearSettings()
  await ensureSettingsExist()
  await renderExtensionSettings()
  await setupUrlInput()
  await setupModelSelect()
  await setupSamplerSelect()
  await setupCfgScaleRange()
  await setupStepsRange()
  await setupWidthRange()
  await setupHeightRange()
  await setupRestoreFacesCheckbox()
  await setupEnableHrCheckbox()
  await setupHrUpScalerSelect()
  await setupHrSamplerSelect()
  await setupHrScaleRange()
  await setupHrDenoisingStrengthRange()
  await setupHrStepsRange()
  await setupCommand()
  await setupAlias()
  await setupInterruptGenerationCheckbox()
  await setupPurgeCommandCheckbox()
  console.log('st-sd-webui-api[settings]: settings setup complete')
}

export const ensureSettingsExist = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  if (stSdWebuiApiSettings === undefined) {
    console.log('st-sd-webui-api[settings]: settings not found, using default settings')
    sillyTavernContext.extensionSettings.stSdWebuiApiSettings = {
      generationSettings: DEFAULT_GENERATION_SETTINGS,
      url: DEFAULT_API_URL,
      extensionSettings: DEFAULT_EXTENSION_SETTINGS
    }
    sillyTavernContext.saveSettingsDebounced()
  }
}

export const clearSettings = async () => {
  console.warn('st-sd-webui-api[settings]: clearing settings, this will reset the extension settings to default, if you see this message and you did not clear the settings, please report this issue')
  const sillyTavernContext = window.SillyTavern.getContext()
  sillyTavernContext.extensionSettings.stSdWebuiApiSettings = undefined
  sillyTavernContext.saveSettingsDebounced()
}

export const renderExtensionSettings = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const extensionSettingsTemplate = document.createRange().createContextualFragment(sillyTavernContext.renderExtensionTemplate(EXTENSION_ID, 'settings'))
  const extensionSettingsElement = document.getElementById('extensions_settings')
  if (extensionSettingsElement !== null) {
    extensionSettingsElement.appendChild(extensionSettingsTemplate)
  }
}

export const setupUrlInput = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const urlInput = document.getElementById('st-sd-webui-api-url')
  urlInput.value = stSdWebuiApiSettings.url
  urlInput.onchange = (event) => {
    sillyTavernContext.extensionSettings.stSdWebuiApiSettings.url = event.target.value
    sillyTavernContext.saveSettingsDebounced()
  }
  urlInput.onblur = (event) => {
    const value = event.target.value
    if (value.endsWith('/')) {
      event.target.value = value.slice(0, -1)
    }
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      event.target.value = 'http://' + value
    }
    if (value.endsWith('/sdapi/v1/')) {
      event.target.value = value.slice(0, -9)
    }
    sillyTavernContext.extensionSettings.stSdWebuiApiSettings.url = event.target.value
    sillyTavernContext.saveSettingsDebounced()
  }
}

export const setupModelSelect = async () => {
  const modelSelect = document.getElementById('st-sd-webui-api-model')
  const modelRefreshButton = document.getElementById('st-sd-webui-api-model-refresh')
  const modelScanButton = document.getElementById('st-sd-webui-api-model-scan')
  const models = await getModels()
  const currentModel = await getCurrentModel()
  models.forEach((model) => {
    const option = document.createElement('option')
    option.value = model.title
    option.innerText = model.model_name
    modelSelect.appendChild(option)
  })
  if (currentModel !== null) {
    modelSelect.value = currentModel
  }
  modelSelect.onchange = async (event) => {
    modelSelect.disabled = true
    try {
      await setModel(event.target.value)
      const currentModel = await getCurrentModel()
      if (currentModel !== null) {
        modelSelect.value = currentModel
      }
    } catch (error) {
      console.error('st-sd-webui-api[settings-modelSelect]:', error)
    } finally {
      modelSelect.disabled = false
    }
  }
  modelRefreshButton.onclick = async () => {
    modelRefreshButton.disabled = true
    try {
      const models = await getModels()
      modelSelect.innerHTML = ''
      models.forEach((model) => {
        const option = document.createElement('option')
        option.value = model.title
        option.innerText = model.model_name
        modelSelect.appendChild(option)
      })
      const currentModel = await getCurrentModel()
      if (currentModel !== null) {
        modelSelect.value = currentModel
      }
    } catch (error) {
      console.error('st-sd-webui-api[settings-modelRefreshButton]:', error)
    } finally {
      modelRefreshButton.disabled = false
    }
  }
  modelScanButton.onclick = async () => {
    setModel.disabled = true
    try {
      await scanModels()
      const models = await getModels()
      modelSelect.innerHTML = ''
      models.forEach((model) => {
        const option = document.createElement('option')
        option.value = model.title
        option.innerText = model.model_name
        modelSelect.appendChild(option)
      })
      const currentModel = await getCurrentModel()
      if (currentModel !== null) {
        modelSelect.value = currentModel
      }
    } catch (error) {
      console.error('st-sd-webui-api[settings-modelScanButton]:', error)
    } finally {
      setModel.disabled = false
    }
  }
}

export const setupSamplerSelect = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const samplerSelect = document.getElementById('st-sd-webui-api-sampler')
  const samplers = await getSamplers()
  samplers.forEach((sampler) => {
    const option = document.createElement('option')
    option.value = sampler.name
    option.innerText = sampler.name
    samplerSelect.appendChild(option)
  })
  samplerSelect.value = stSdWebuiApiSettings.generationSettings.sampler_name
  samplerSelect.onchange = (event) => {
    sillyTavernContext.extensionSettings.stSdWebuiApiSettings.generationSettings.sampler_name = event.target.value
    sillyTavernContext.saveSettingsDebounced()
  }
  samplerSelect.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = sillyTavernContext.extensionSettings.stSdWebuiApiSettings.generationSettings.sampler_name
    }
  }
}

export const setupCfgScaleRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const cfgScaleRange = document.getElementById('st-sd-webui-api-cfg-scale')
  const cfgInput = document.getElementById('st-sd-webui-api-cfg-scale-value')
  const cfgValue = stSdWebuiApiSettings.generationSettings.cfg_scale
  cfgScaleRange.value = cfgValue
  cfgInput.value = cfgValue
  cfgScaleRange.oninput = (event) => {
    const value = parseFloat(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.cfg_scale
      return
    }
    cfgInput.value = value
    stSdWebuiApiSettings.generationSettings.cfg_scale = value
    sillyTavernContext.saveSettingsDebounced()
  }
  cfgInput.oninput = (event) => {
    const value = parseFloat(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.cfg_scale
      return
    }
    cfgScaleRange.value = value
    stSdWebuiApiSettings.generationSettings.cfg_scale = value
    sillyTavernContext.saveSettingsDebounced()
  }
  cfgInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.cfg_scale
    }
  }
  cfgScaleRange.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.cfg_scale
    }
  }
}

export const setupStepsRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const stepsRange = document.getElementById('st-sd-webui-api-sampling-steps')
  const stepsInput = document.getElementById('st-sd-webui-api-sampling-steps-value')
  const stepsValue = stSdWebuiApiSettings.generationSettings.steps
  stepsRange.value = stepsValue
  stepsInput.value = stepsValue
  stepsRange.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.steps
      return
    }
    stepsInput.value = value
    stSdWebuiApiSettings.generationSettings.steps = value
    sillyTavernContext.saveSettingsDebounced()
  }
  stepsInput.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.steps
      return
    }
    stepsRange.value = value
    stSdWebuiApiSettings.generationSettings.steps = value
    sillyTavernContext.saveSettingsDebounced()
  }
  stepsInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.steps
    }
  }
  stepsRange.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.steps
    }
  }
}

export const setupWidthRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const widthRange = document.getElementById('st-sd-webui-api-width')
  const widthInput = document.getElementById('st-sd-webui-api-width-value')
  const widthValue = stSdWebuiApiSettings.generationSettings.width
  widthRange.value = widthValue
  widthInput.value = widthValue
  widthRange.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.width
      return
    }
    widthInput.value = value
    stSdWebuiApiSettings.generationSettings.width = value
    sillyTavernContext.saveSettingsDebounced()
  }
  widthInput.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.width
      return
    }
    widthRange.value = value
    stSdWebuiApiSettings.generationSettings.width = value
    sillyTavernContext.saveSettingsDebounced()
  }
  widthInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.width
    }
  }
  widthRange.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.width
    }
  }
}

export const setupHeightRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const heightRange = document.getElementById('st-sd-webui-api-height')
  const heightInput = document.getElementById('st-sd-webui-api-height-value')
  const heightValue = stSdWebuiApiSettings.generationSettings.height
  heightRange.value = heightValue
  heightInput.value = heightValue
  heightRange.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.height
      return
    }
    heightInput.value = value
    stSdWebuiApiSettings.generationSettings.height = value
    sillyTavernContext.saveSettingsDebounced()
  }
  heightInput.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.height
      return
    }
    heightRange.value = value
    stSdWebuiApiSettings.generationSettings.height = value
    sillyTavernContext.saveSettingsDebounced()
  }
  heightInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.height
    }
  }
  heightRange.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.height
    }
  }
}

export const setupRestoreFacesCheckbox = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  const restoreFacesCheckbox = document.getElementById('st-sd-webui-api-restore-faces')
  restoreFacesCheckbox.checked = stSdWebuiApiSettings.generationSettings.restore_faces
  restoreFacesCheckbox.onchange = (event) => {
    stSdWebuiApiSettings.generationSettings.restore_faces = event.target.checked
    sillyTavernContext.saveSettingsDebounced()
  }
}

export const setupEnableHrCheckbox = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const enableHrCheckbox = document.getElementById('st-sd-webui-api-enable-hr')
  const hrSettings = document.getElementById('st-sd-webui-api-hr-settings')
  enableHrCheckbox.checked = stSdWebuiApiSettings.generationSettings.enable_hr
  hrSettings.style.display = stSdWebuiApiSettings.generationSettings.enable_hr ? 'block' : 'none'
  enableHrCheckbox.onchange = (event) => {
    stSdWebuiApiSettings.generationSettings.enable_hr = event.target.checked
    hrSettings.style.display = event.target.checked ? 'block' : 'none'
    sillyTavernContext.saveSettingsDebounced()
  }
}

export const setupHrUpScalerSelect = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const hrUpScalerSelect = document.getElementById('st-sd-webui-api-hr-upscaler')
  const hrUpScalers = await getUpScalers()
  hrUpScalers.forEach((upscaler) => {
    const option = document.createElement('option')
    option.value = upscaler.name
    option.innerText = upscaler.name
    hrUpScalerSelect.appendChild(option)
  })
  hrUpScalerSelect.value = stSdWebuiApiSettings.generationSettings.hr_upscaler
  hrUpScalerSelect.onchange = (event) => {
    stSdWebuiApiSettings.generationSettings.hr_upscaler = event.target.value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrUpScalerSelect.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_upscaler
    }
  }
}

export const setupHrSamplerSelect = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const hrSamplerSelect = document.getElementById('st-sd-webui-api-hr-sampler')
  const nullSamplerOption = document.createElement('option')
  nullSamplerOption.value = ''
  nullSamplerOption.innerText = 'None'
  hrSamplerSelect.appendChild(nullSamplerOption)
  const samplers = await getSamplers()
  samplers.forEach((sampler) => {
    const option = document.createElement('option')
    option.value = sampler.name
    option.innerText = sampler.name
    hrSamplerSelect.appendChild(option)
  })
  hrSamplerSelect.value = stSdWebuiApiSettings.generationSettings.hr_sampler_name ?? ''
  hrSamplerSelect.onchange = (event) => {
    const value = event.target.value
    if (value === '') {
      stSdWebuiApiSettings.generationSettings.hr_sampler_name = null
      return
    }
    stSdWebuiApiSettings.generationSettings.hr_sampler_name = value
  }
  hrSamplerSelect.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_sampler_name
    }
  }
}

export const setupHrScaleRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const hrScaleRange = document.getElementById('st-sd-webui-api-hr-scale')
  const hrInput = document.getElementById('st-sd-webui-api-hr-scale-value')
  const hrValue = stSdWebuiApiSettings.generationSettings.hr_scale
  hrScaleRange.value = hrValue
  hrInput.value = hrValue
  hrScaleRange.oninput = (event) => {
    const value = parseFloat(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_scale
      return
    }
    hrInput.value = value
    stSdWebuiApiSettings.generationSettings.hr_scale = value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrInput.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_scale
      return
    }
    hrScaleRange.value = value
    stSdWebuiApiSettings.generationSettings.hr_scale = value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_scale
    }
  }
}

export const setupHrDenoisingStrengthRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  const hrDenoisingStrengthRange = document.getElementById('st-sd-webui-api-hr-denoising-strength')
  const hrDenoisingStrengthInput = document.getElementById('st-sd-webui-api-hr-denoising-strength-value')
  const hrDenoisingStrengthValue = stSdWebuiApiSettings.generationSettings.denoising_strength
  hrDenoisingStrengthRange.value = hrDenoisingStrengthValue
  hrDenoisingStrengthInput.value = hrDenoisingStrengthValue
  hrDenoisingStrengthRange.oninput = (event) => {
    const value = parseFloat(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.denoising_strength
      return
    }
    hrDenoisingStrengthInput.value = value
    stSdWebuiApiSettings.generationSettings.denoising_strength = value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrDenoisingStrengthInput.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.denoising_strength
      return
    }
    hrDenoisingStrengthRange.value = value
    stSdWebuiApiSettings.generationSettings.denoising_strength = value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrDenoisingStrengthInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.denoising_strength
    }
  }
}

export const setupHrStepsRange = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings

  const hrSteps = document.getElementById('st-sd-webui-api-hr-steps')
  const hrStepsInput = document.getElementById('st-sd-webui-api-hr-steps-value')
  const hrStepsValue = stSdWebuiApiSettings.generationSettings.hr_second_pass_steps
  hrSteps.value = hrStepsValue
  hrStepsInput.value = hrStepsValue
  hrSteps.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_second_pass_steps
      return
    }
    hrStepsInput.value = value
    stSdWebuiApiSettings.generationSettings.hr_second_pass_steps = value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrStepsInput.oninput = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_second_pass_steps
      return
    }
    hrSteps.value = value
    stSdWebuiApiSettings.generationSettings.hr_second_pass_steps = value
    sillyTavernContext.saveSettingsDebounced()
  }
  hrStepsInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_second_pass_steps
    }
  }
  hrSteps.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = stSdWebuiApiSettings.generationSettings.hr_second_pass_steps
    }
  }
}

export const setupCommand = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  const commandInput = document.getElementById('st-sd-webui-api-command')
  commandInput.value = stSdWebuiApiSettings.extensionSettings.command
  commandInput.onchange = (event) => {
    if (event.target.value === '') {
      event.target.value = 'imagen'
      return
    }
    stSdWebuiApiSettings.extensionSettings.command = event.target.value
    sillyTavernContext.saveSettingsDebounced()
  }
  commandInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = 'imagen'
    }
  }
}

export const setupAlias = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  const aliasInput = document.getElementById('st-sd-webui-api-command-alias')
  aliasInput.value = stSdWebuiApiSettings.extensionSettings.commandAlias
  aliasInput.onchange = (event) => {
    stSdWebuiApiSettings.extensionSettings.commandAlias = event.target.value
    sillyTavernContext.saveSettingsDebounced()
  }
  aliasInput.onblur = (event) => {
    const value = event.target.value
    if (value === '') {
      event.target.value = ''
    }
  }
}

export const setupInterruptGenerationCheckbox = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  const interruptGenerationCheckbox = document.getElementById('st-sd-webui-api-interrupt-generation')
  interruptGenerationCheckbox.checked = stSdWebuiApiSettings.extensionSettings.interruptGeneration
  interruptGenerationCheckbox.onchange = (event) => {
    stSdWebuiApiSettings.extensionSettings.interruptGeneration = event.target.checked
    sillyTavernContext.saveSettingsDebounced()
  }
}

export const setupPurgeCommandCheckbox = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  const purgeCommandCheckbox = document.getElementById('st-sd-webui-api-purge-command')
  purgeCommandCheckbox.checked = stSdWebuiApiSettings.extensionSettings.purgeCommand
  purgeCommandCheckbox.onchange = (event) => {
    stSdWebuiApiSettings.extensionSettings.purgeCommand = event.target.checked
    sillyTavernContext.saveSettingsDebounced()
  }
}
