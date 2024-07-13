/**
 * @typedef {import('./typedefs.js').ModelData} ModelData
 * @typedef {import('./typedefs.js').StableDiffusionWebuiOptions} StableDiffusionWebuiOptions
 * @typedef {import('./typedefs.js').Sampler} Sampler
 * @typedef {import('./typedefs.js').Scheduler} Scheduler
 * @typedef {import('./typedefs.js').UpScaler} UpScaler
 * @typedef {import('./typedefs.js').GenerationResponse} GenerationResponse
 * @typedef {import('./typedefs.js').GenerationResponseWithInfo} GenerationResponseWithInfo
 * @typedef {import('./typedefs.js').GenerationSettings} GenerationSettings
 * @typedef {import('./typedefs.js').Style} Style
 */

/**
 * Retrieves options from the Stable diffusion Webui API.
 * @returns {Promise<StableDiffusionWebuiOptions>} The options object.
 */
export const getOptions = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/options`)
    const options = await response.json()
    return options
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-getOptions]:', error)
  }
}

/**
 * Retrieves the models from the Stable diffusion Webui API.
 * @returns {Promise<ModelData[]>} A promise that resolves to an array of ModelData objects.
 */
export const getModels = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/sd-models`)
    /** @type {ModelData[]} */
    const models = await response.json()
    return models
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * Sets the model for the Stable diffusion Webui API.
 * @param {string} model - The model to set.
 * @returns {Promise<void>} - A promise that resolves to true if the model is set successfully, or rejects with an error if there is an issue.
 */
export const setModel = async (model) => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sd_model_checkpoint: model
      })
    })
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-setModel]:', error)
  }
}

/**
 * Retrieves the model from the Stable diffusion Webui API.
 * @returns {Promise<string>} A promise that resolves to the model checkpoint or null if there was an error.
 */
export const getCurrentModel = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/options`)
    const options = await response.json()
    return options.sd_model_checkpoint
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-getModel]:', error)
  }
}

/**
 * Scans the models by making a POST request to the Stable diffusion Webui API.
 * @returns {Promise<void>} A promise that resolves when the request is completed.
 */
export const scanModels = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/refresh-checkpoints`, {
      method: 'POST'
    })
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-scanModels]:', error)
  }
}

/**
 * Retrieves the list of samplers from the Stable diffusion Webui API.
 * @returns {Promise<Sampler[]>} A promise that resolves to an array of samplers.
 */
export const getSamplers = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/samplers`)
    const samplers = await response.json()
    return samplers
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-getSamplers]:', error)
  }
}

/**
 * Retrieves the list of schedulers from the Stable diffusion Webui API.
 * @returns {Promise<Scheduler[]>} A promise that resolves to an array of schedulers.
 */
export const getSchedulers = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/schedulers`)
    const schedulers = await response.json()
    return schedulers
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-getSchedulers]:', error)
  }
}

/**
 * Retrieves the list of upscalers from the Stable diffusion Webui API.
 * @returns {Promise<UpScaler[]>} A promise that resolves to an array of upscalers.
 */
export const getUpScalers = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/upscalers`)
    const upscalers = await response.json()
    return upscalers
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-getUpScalers]:', error)
  }
}

/**
 * Retrieves the prompt styles from the Stable diffusion Webui API.
 * @returns {Promise<Style[]>} A promise that resolves to the prompt styles object.
 */
export const getStyles = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/prompt-styles`)
    const styles = await response.json()
    return styles
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-getStyles]:', error)
  }
}

/**
 * Generates an image using the provided image data using the Stable diffusion Webui API.
 * @param {GenerationSettings} imageData - The data required to generate the image.
 * @returns {Promise<GenerationResponseWithInfo>} - A promise that resolves to the generation response with additional information.
 */
export const generateImage = async (imageData) => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const { stSdWebuiApiSettings } = sillyTavernContext.extensionSettings
  try {
    const response = await fetch(`${stSdWebuiApiSettings.url}/sdapi/v1/txt2img`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imageData)
    })
    /** @type {GenerationResponse} */
    const generationResponse = await response.json()
    /** @type {GenerationResponseWithInfo} */
    const generationResponseWithInfo = {
      ...generationResponse,
      info: JSON.parse(generationResponse.info)
    }
    return generationResponseWithInfo
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-generateImage]:', error)
  }
}

/**
 * Uploads an image with the specified character name to the Silly Tavern API.
 * @param {string} image - The image to be uploaded.
 * @param {string} characterName - The name of the character associated with the image.
 * @returns {Promise<Object>} - A promise that resolves to the result of the upload.
 */
export const uploadImage = async (image, characterName) => {
  const sillyTavernContext = window.SillyTavern.getContext()
  const filename = (new Date().toISOString() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).replace(/:/g, '-').replace(/\./g, '-').replace(/_/g, '-').replace(/ /g, '-')
  try {
    const response = await fetch('/api/images/upload', {
      method: 'POST',
      headers: {
        ...sillyTavernContext.getRequestHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image,
        ch_name: characterName,
        filename
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('st-sd-webui-api[apiCall-uploadImage]:', error)
  }
}
