# SillyTavern Stable Diffusion Webui API

- [SillyTavern Stable Diffusion Webui API](#sillytavern-stable-diffusion-webui-api)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Minimal Example](#minimal-example)
  - [Arguments](#arguments)
    - [Example](#example)
  - [License](#license)


## Description

This extension allows you to use the Stable Diffusion Webui API from SillyTavern.

## Installation

In your SillyTavern page, go to the Extensions tab and click on the "Install Extension" button. Paste the following URL in the text field and click "Save":

```
https://github.com/SrJuggernaut/st-sd-webui-api
```
> [!IMPORTANT]  
> Since this extension makes all the API calls to the Stable Diffusion Webui from the client side, it may need to be run it with the flags `--api --cors-allow-origins *` in order to make it work.

## Usage

This extension creates a new Slash Command called `/imagen` that allows you to Generate a image (Image Generation) using the prompt you provide.

### Minimal Example

```
/imagen futuristic city with neon lights and flying cars
```

## Arguments

The `/imagen` command allows you to overwrite the default values of the extension configuration for each call. The following arguments are available:

- **negativePrompt** The negative prompt to use. Example: `/imagen negativePrompt="The negative prompt"`
- **styles** The styles to use separated by commas. Example: `/imagen styles="style1, style2"`
- **seed** The seed to use. Example: `/imagen seed=123456`
- **samplerName** The sampler to use. Example: `/imagen samplerName="sampler_name"`
- **batchSize** The batch size to use. Example: `/imagen batchSize=1`
- **steps** The steps to use. Example: `/imagen steps=35`
- **cfgScale** The cfg scale to use. Example: `/imagen cfgScale=6.5`
- **width** The width to use. Example: `/imagen width=512`
- **height** The height to use. Example: `/imagen height=768`
- **restoreFaces** Whether to restore faces or not. Example: `/imagen restoreFaces=true`
- **enableHr** Whether to enable high resolution or not. Example: `/imagen enableHr=true`
- **hrScale** The high resolution scale to use. Example: `/imagen hrScale=2`
- **hrUpscaler** The high resolution upscaler to use. Example: `/imagen hrUpscaler="upscaler_name"`
- **hrSecondPassSteps** The high resolution second pass steps to use. Example: `/imagen hrSecondPassSteps=35`
- **hrResizeX** The high resolution resize x to use. Example: `/imagen hrResizeX=512`
- **hrResizeY** The high resolution resize y to use. Example: `/imagen hrResizeY=768`
- **hrSamplerName** The high resolution sampler to use. Example: `/imagen hrSamplerName="sampler_name"`
- **hrPrompt** The high resolution prompt to use. Example: `/imagen hrPrompt="The high resolution prompt"`
- **hrNegativePrompt** The high resolution negative prompt to use. Example: `/imagen hrNegativePrompt="The high resolution negative prompt"`
- **denoisingStrength** The denoising strength to use. Example: `/imagen denoisingStrength=0.5`
- **refinerCheckpoint** The refiner checkpoint to use. Example: `/imagen refinerCheckpoint="checkpoint_name"`
- **refinerSwitchAt** The refiner switch at to use. Example: `/imagen refinerSwitchAt=0.5`
- **doNotSaveSamples** Whether to not save samples or not. Example: `/imagen doNotSaveSamples=true`
- **doNotSaveGrid** Whether to not save the grid or not. Example: `/imagen doNotSaveGrid=true`
- **saveImages** Whether to save images or not. Example: `/imagen saveImages=true`
- **alwaysonScripts** Must be a valid JSON with the always on scripts to use. Example: `/imagen alwaysonScripts='{"ADetailer":{"args":[{"ad_model":"mediapipe_face_full"}]}}'`

### Example

```
/imagen negativePrompt="monotone, bokeh, distortion" width=768 height=512 batchSize=1 steps=35 cfgScale=6.5 seed=123465 styles="Style: realistic, Style: vibrant photo" futuristic city with neon lights and flying cars
```

## License

MIT

