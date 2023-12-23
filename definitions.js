/**
 * @typedef {import('./typedefs.js').GenerationSettings} GenerationSettings
 */

/**
 * The extension ID for the third-party/st-sd-webui-api.
 * @type {string}
 */
export const EXTENSION_ID = 'third-party/st-sd-webui-api'

/**
 * The name of the extension.
 * @type {string}
 */
export const EXTENSION_NAME = 'st-sd-webui-api'

/**
 * Default generation settings.
 *
 * @type {Partial<GenerationSettings>}
 */
export const DEFAULT_GENERATION_SETTINGS = {
  // Generation settings
  prompt: '',
  negative_prompt: '',
  styles: [],
  seed: -1,
  sampler_name: 'Euler',
  batch_size: 1,
  steps: 35,
  cfg_scale: 7,
  width: 512,
  height: 512,
  // Face restoration
  restore_faces: false,
  // High resolution settings
  enable_hr: false,
  hr_scale: 2,
  hr_upscaler: 'None',
  hr_second_pass_steps: 0,
  hr_sampler_name: undefined,
  denoising_strength: 0.7,
  // Refiner settings
  refiner_checkpoint: undefined,
  refiner_switch_at: 0.8,
  // Image Saving
  do_not_save_samples: false,
  do_not_save_grid: false,
  save_images: true,
  send_images: true
}

export const DEFAULT_API_URL = 'http://127.0.0.1:7860/'
