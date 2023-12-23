export const Types = {}

/**
 * @namespace stSdWebuiApi
 */

/**
  *
  *@typedef {Object} StableDiffusionWebuiOptions
  *@property {boolean} samples_save - Whether to save samples.
  *@property {string} samples_format - The format of the saved samples.
  *@property {string} samples_filename_pattern - The filename pattern for saved samples.
  *@property {boolean} save_images_add_number - Whether to add a number to saved images.
  *@property {boolean} grid_save - Whether to save grids.
  *@property {string} grid_format - The format of the saved grids.
  *@property {boolean} grid_extended_filename - Whether to use an extended filename for saved grids.
  *@property {boolean} grid_only_if_multiple - Whether to save grids only if there are multiple images.
  *@property {boolean} grid_prevent_empty_spots - Whether to prevent empty spots in saved grids.
  *@property {string} grid_zip_filename_pattern - The filename pattern for zipped grids.
  *@property {number} n_rows - The number of rows in the grid.
  *@property {string} font - The font to use.
  *@property {string} grid_text_active_color - The color of active grid text.
  *@property {string} grid_text_inactive_color - The color of inactive grid text.
  *@property {string} grid_background_color - The background color of the grid.
  *@property {boolean} enable_pnginfo - Whether to enable PNG info.
  *@property {boolean} save_txt - Whether to save as TXT.
  *@property {boolean} save_images_before_face_restoration - Whether to save images before face restoration.
  *@property {boolean} save_images_before_highres_fix - Whether to save images before high-resolution fix.
  *@property {boolean} save_images_before_color_correction - Whether to save images before color correction.
  *@property {boolean} save_mask - Whether to save the mask.
  *@property {boolean} save_mask_composite - Whether to save the composite mask.
  *@property {number} jpeg_quality - The JPEG quality.
  *@property {boolean} webp_lossless - Whether to use lossless WebP.
  *@property {boolean} export_for_4chan - Whether to export for 4chan.
  *@property {number} img_downscale_threshold - The image downscale threshold.
  *@property {number} target_side_length - The target side length.
  *@property {number} img_max_size_mp - The maximum image size in megapixels.
  *@property {boolean} use_original_name_batch - Whether to use the original name for batch processing.
  *@property {boolean} use_upscaler_name_as_suffix - Whether to use the upscaler name as a suffix.
  *@property {boolean} save_selected_only - Whether to save only the selected images.
  *@property {boolean} save_init_img - Whether to save the initial image.
  *@property {string} temp_dir - The temporary directory.
  *@property {boolean} clean_temp_dir_at_start - Whether to clean the temporary directory at start.
  *@property {boolean} save_incomplete_images - Whether to save incomplete images.
  *@property {string} outdir_samples - The output directory for samples.
  *@property {string} outdir_txt2img_samples - The output directory for txt2img samples.
  *@property {string} outdir_img2img_samples - The output directory for img2img samples.
  *@property {string} outdir_extras_samples - The output directory for extras samples.
  *@property {string} outdir_grids - The output directory for grids.
  *@property {string} outdir_txt2img_grids - The output directory for txt2img grids.
  *@property {string} outdir_img2img_grids - The output directory for img2img grids.
  *@property {string} outdir_save - The output directory for saved images.
  *@property {string} outdir_init_images - The output directory for initial images.
  *@property {boolean} save_to_dirs - Whether to save to directories.
  *@property {boolean} grid_save_to_dirs - Whether to save grids to directories.
  *@property {boolean} use_save_to_dirs_for_ui - Whether to use save to directories for the UI.
  *@property {string} directories_filename_pattern - The filename pattern for directories.
  *@property {number} directories_max_prompt_words - The maximum number of prompt words in directories.
  *@property {number} ESRGAN_tile - The ESRGAN tile size.
  *@property {number} ESRGAN_tile_overlap - The ESRGAN tile overlap.
  *@property {string[]} realesrgan_enabled_models - The enabled Realesrgan models.
  *@property {Object} upscaler_for_img2img - The upscaler for img2img.
  *@property {string} upscaler_for_img2img.title - The title of the upscaler for img2img.
  *@property {string} upscaler_for_img2img.description - The description of the upscaler for img2img.
  *@property {boolean} face_restoration - Whether to enable face restoration.
  *@property {string} face_restoration_model - The face restoration model.
  *@property {number} code_former_weight - The weight of the CodeFormer model.
  *@property {boolean} face_restoration_unload - Whether to unload the face restoration model.
  *@property {string} auto_launch_browser - The auto launch browser setting.
  *@property {boolean} show_warnings - Whether to show warnings.
  *@property {boolean} show_gradio_deprecation_warnings - Whether to show Gradio deprecation warnings.
  *@property {number} memmon_poll_rate - The memory monitor poll rate.
  *@property {boolean} samples_log_stdout - Whether to log samples to stdout.
  *@property {boolean} multiple_tqdm - Whether to use multiple tqdm instances.
  *@property {boolean} print_hypernet_extra - Whether to print hypernet extra information.
  *@property {boolean} list_hidden_files - Whether to list hidden files.
  *@property {boolean} disable_mmap_load_safetensors - Whether to disable mmap load safetensors.
  *@property {boolean} hide_ldm_prints - Whether to hide LDM prints.
  *@property {boolean} api_enable_requests - Whether to enable API requests.
  *@property {boolean} api_forbid_local_requests - Whether to forbid local API requests.
  *@property {string} api_useragent - The user agent for API requests.
  *@property {boolean} unload_models_when_training - Whether to unload models when training.
  *@property {boolean} pin_memory - Whether to pin memory.
  *@property {boolean} save_optimizer_state - Whether to save optimizer state.
  *@property {boolean} save_training_settings_to_txt - Whether to save training settings to TXT.
  *@property {string} dataset_filename_word_regex - The regex for dataset filename words.
  *@property {string} dataset_filename_join_string - The string to join dataset filename words.
  *@property {number} training_image_repeats_per_epoch - The number of image repeats per epoch.
  *@property {number} training_write_csv_every - The interval to write CSV during training.
  *@property {boolean} training_xattention_optimizations - Whether to enable xattention optimizations during training.
  *@property {boolean} training_enable_tensorboard - Whether to enable TensorBoard during training.
  *@property {boolean} training_tensorboard_save_images - Whether to save images in TensorBoard during training.
  *@property {number} training_tensorboard_flush_every - The interval to flush TensorBoard during training.
  *@property {Object} sd_model_checkpoint - The SD model checkpoint.
  *@property {string} sd_model_checkpoint.title - The title of the SD model checkpoint.
  *@property {string} sd_model_checkpoint.description - The description of the SD model checkpoint.
  *@property {number} sd_checkpoints_limit - The limit of SD checkpoints.
  *@property {boolean} sd_checkpoints_keep_in_cpu - Whether to keep SD checkpoints in CPU.
  *@property {number} sd_checkpoint_cache - The SD checkpoint cache.
  *@property {string} sd_unet - The SD U-Net setting.
  *@property {boolean} enable_quantization - Whether to enable quantization.
  *@property {boolean} enable_emphasis - Whether to enable emphasis.
  *@property {boolean} enable_batch_seeds - Whether to enable batch seeds.
  *@property {number} comma_padding_backtrack - The comma padding backtrack.
  *@property {number} CLIP_stop_at_last_layers - The number of CLIP layers to stop at.
  *@property {boolean} upcast_attn - Whether to upcast attention.
  *@property {string} randn_source - The source of random noise.
  *@property {boolean} tiling - Whether to enable tiling.
  *@property {string} hires_fix_refiner_pass - The pass for the hires fix refiner.
  *@property {number} sdxl_crop_top - The top crop for SDXL.
  *@property {number} sdxl_crop_left - The left crop for SDXL.
  *@property {number} sdxl_refiner_low_aesthetic_score - The low aesthetic score for SDXL refiner.
  *@property {number} sdxl_refiner_high_aesthetic_score - The high aesthetic score for SDXL refiner.
  *@property {string} sd_vae_explanation - The explanation of the SD VAE.
  *@property {number} sd_vae_checkpoint_cache - The SD VAE checkpoint cache.
  *@property {string} sd_vae - The SD VAE setting.
  *@property {boolean} sd_vae_overrides_per_model_preferences - Whether SD VAE overrides per model preferences.
  *@property {boolean} auto_vae_precision - Whether to use auto VAE precision.
  *@property {string} sd_vae_encode_method - The SD VAE encode method.
  *@property {string} sd_vae_decode_method - The SD VAE decode method.
  *@property {number} inpainting_mask_weight - The weight of the inpainting mask.
  *@property {number} initial_noise_multiplier - The initial noise multiplier.
  *@property {number} img2img_extra_noise - The extra noise for img2img.
  *@property {boolean} img2img_color_correction - Whether to enable color correction for img2img.
  *@property {boolean} img2img_fix_steps - Whether to fix steps for img2img.
  *@property {string} img2img_background_color - The background color for img2img.
  *@property {number} img2img_editor_height - The height of the img2img editor.
  *@property {string} img2img_sketch_default_brush_color - The default brush color for img2img sketch.
  *@property {string} img2img_inpaint_mask_brush_color - The brush color for img2img inpaint mask.
  *@property {string} img2img_inpaint_sketch_default_brush_color - The default brush color for img2img inpaint sketch.
  *@property {boolean} return_mask - Whether to return the mask.
  *@property {boolean} return_mask_composite - Whether to return the composite mask.
  *@property {string} cross_attention_optimization - The cross attention optimization setting.
  *@property {number} s_min_uncond - The minimum unconditioned s value.
  *@property {number} token_merging_ratio - The token merging ratio.
  *@property {number} token_merging_ratio_img2img - The token merging ratio for img2img.
  *@property {number} token_merging_ratio_hr - The token merging ratio for HR.
  *@property {boolean} pad_cond_uncond - Whether to pad conditioned and unconditioned tokens.
  *@property {boolean} persistent_cond_cache - Whether to use a persistent conditioned cache.
  *@property {boolean} batch_cond_uncond - Whether to batch conditioned and unconditioned tokens.
  *@property {boolean} use_old_emphasis_implementation - Whether to use the old emphasis implementation.
  *@property {boolean} use_old_karras_scheduler_sigmas - Whether to use the old Karras scheduler sigmas.
  *@property {boolean} no_dpmpp_sde_batch_determinism - Whether to disable DPMPP SDE batch determinism.
  *@property {boolean} use_old_hires_fix_width_height - Whether to use the old hires fix width and height.
  *@property {boolean} dont_fix_second_order_samplers_schedule - Whether to not fix the second order samplers schedule.
  *@property {boolean} hires_fix_use_firstpass_conds - Whether to use first pass conditions for hires fix.
  *@property {boolean} use_old_scheduling - Whether to use the old scheduling.
  *@property {boolean} interrogate_keep_models_in_memory - Whether to keep models in memory during interrogation.
  *@property {boolean} interrogate_return_ranks - Whether to return ranks during interrogation.
  *@property {number} interrogate_clip_num_beams - The number of beams for CLIP interrogation.
  *@property {number} interrogate_clip_min_length - The minimum length for CLIP interrogation.
  *@property {number} interrogate_clip_max_length - The maximum length for CLIP interrogation.
  *@property {number} interrogate_clip_dict_limit - The dictionary limit for CLIP interrogation.
  *@property {number} interrogate_deepbooru_score_threshold - The score threshold for DeepBooru interrogation.
  *@property {boolean} deepbooru_sort_alpha - Whether to sort DeepBooru tags alphabetically.
  *@property {boolean} deepbooru_use_spaces - Whether to use spaces in DeepBooru tags.
  *@property {boolean} deepbooru_escape - Whether to escape DeepBooru tags.
  *@property {string} deepbooru_filter_tags - The filter tags for DeepBooru.
  *@property {boolean} extra_networks_show_hidden_directories - Whether to show hidden directories for extra networks.
  *@property {string} extra_networks_hidden_models - The hidden models for extra networks.
  *@property {number} extra_networks_default_multiplier - The default multiplier for extra networks.
  *@property {number} extra_networks_card_width - The width of the extra networks card.
  *@property {number} extra_networks_card_height - The height of the extra networks card.
  *@property {number} extra_networks_card_text_scale - The text scale of the extra networks card.
  *@property {boolean} extra_networks_card_show_desc - Whether to show the description on the extra networks card.
  *@property {string} extra_networks_add_text_separator - The separator for additional text on the extra networks card.
  *@property {string} ui_extra_networks_tab_reorder - The reorder setting for the UI extra networks tab.
  *@property {boolean} textual_inversion_print_at_load - Whether to print textual inversion at load.
  *@property {boolean} textual_inversion_add_hashes_to_infotext - Whether to add hashes to the infotext for textual inversion.
  *@property {string} sd_hypernetwork - The SD hypernetwork setting.
  *@property {string} localization - The localization setting.
  *@property {string} gradio_theme - The Gradio theme.
  *@property {boolean} gradio_themes_cache - Whether to cache Gradio themes.
  *@property {string} gallery_height - The height of the gallery.
  *@property {boolean} return_grid - Whether to return the grid.
  *@property {boolean} do_not_show_images - Whether to not show images.
  *@property {boolean} send_seed - Whether to send the seed.
  *@property {boolean} send_size - Whether to send the size.
  *@property {boolean} js_modal_lightbox - Whether to use a JavaScript modal lightbox.
  *@property {boolean} js_modal_lightbox_initially_zoomed - Whether the JavaScript modal lightbox is initially zoomed.
  *@property {boolean} js_modal_lightbox_gamepad - Whether the JavaScript modal lightbox supports gamepad.
  *@property {number} js_modal_lightbox_gamepad_repeat - The repeat rate for gamepad controls in the JavaScript modal lightbox.
  *@property {boolean} show_progress_in_title - Whether to show progress in the title.
  *@property {boolean} samplers_in_dropdown - Whether to show samplers in the dropdown.
  *@property {boolean} dimensions_and_batch_together - Whether to show dimensions and batch together.
  *@property {number} keyedit_precision_attention - The precision for keyedit attention.
  *@property {number} keyedit_precision_extra - The precision for keyedit extra.
  *@property {string} keyedit_delimiters - The delimiters for keyedit.
  *@property {boolean} keyedit_move - Whether to move keyedit.
  *@property {string[]} quicksettings_list - The list of quicksettings.
  *@property {boolean} hires_fix_show_sampler - Whether to show the sampler for hires fix.
  *@property {boolean} hires_fix_show_prompts - Whether to show prompts for hires fix.
  *@property {boolean} disable_token_counters - Whether to disable token counters.
  *@property {boolean} add_model_hash_to_info - Whether to add the model hash to the infotext.
  *@property {boolean} add_model_name_to_info - Whether to add the model name to the infotext.
  *@property {boolean} add_user_name_to_info - Whether to add the user name to the infotext.
  *@property {boolean} add_version_to_infotext - Whether to add the version to the infotext.
  *@property {boolean} disable_weights_auto_swap - Whether to disable automatic weight swapping.
  *@property {string} infotext_styles - The styles to apply to the infotext.
  *@property {boolean} show_progressbar - Whether to show the progress bar.
  *@property {boolean} live_previews_enable - Whether to enable live previews.
  *@property {string} live_previews_image_format - The image format for live previews.
  *@property {boolean} show_progress_grid - Whether to show the progress grid.
  *@property {number} show_progress_every_n_steps - The interval to show progress.
  *@property {string} show_progress_type - The type of progress to show.
  *@property {boolean} live_preview_allow_lowvram_full - Whether to allow low VRAM for full live previews.
  *@property {string} live_preview_content - The content for live previews.
  *@property {number} live_preview_refresh_period - The refresh period for live previews.
  *@property {boolean} live_preview_fast_interrupt - Whether to enable fast interrupt for live previews.
  *@property {number} eta_ddim - The eta ddim value.
  *@property {number} eta_ancestral - The eta ancestral value.
  *@property {string} ddim_discretize - The discretize setting for ddim.
  *@property {number} s_churn - The s churn value.
  *@property {number} s_tmin - The minimum s value.
  *@property {number} s_tmax - The maximum s value.
  *@property {number} s_noise - The s noise value.
  *@property {string} k_sched_type - The k sched type.
  *@property {number} sigma_min - The minimum sigma value.
  *@property {number} sigma_max - The maximum sigma value.
  *@property {number} rho - The rho value.
  *@property {number} eta_noise_seed_delta - The eta noise seed delta value.
  *@property {boolean} always_discard_next_to_last_sigma - Whether to always discard the next-to-last sigma.
  *@property {boolean} sgm_noise_multiplier - Whether to use the noise multiplier for SGM.
  *@property {string} uni_pc_variant - The uni pc variant.
  *@property {string} uni_pc_skip_type - The uni pc skip type.
  *@property {number} uni_pc_order - The uni pc order.
  *@property {boolean} uni_pc_lower_order_final - Whether to lower the order for the final step of uni pc.
  *@property {number} upscaling_max_images_in_cache - The maximum number of images in the upscaling cache.
  *@property {string} disable_all_extensions - The setting to disable all extensions.
  *@property {string} restore_config_state_file - The file to restore the config state from.
  *@property {string} sd_checkpoint_hash - The hash of the SD checkpoint.
*/

/**
 * Generation settings object.
 *
 * @typedef {Object} GenerationSettings
 * @property {string} prompt - The prompt for generation.
 * @property {string} negativePrompt - The negative prompt for generation.
 * @property {string[]} styles - The styles for generation.
 * @property {number} seed - The seed for generation.
 * @property {string} sampler_name - The sampler name for generation.
 * @property {number} batch_size - The batch size for generation.
 * @property {number} steps - The number of steps for generation.
 * @property {number} cfg_scale - The scale for generation.
 * @property {number} width - The width of the generated image.
 * @property {number} height - The height of the generated image.
 * @property {boolean} restore_faces - Whether to restore faces in the generated image.
 * @property {boolean} enable_hr - Whether to enable high resolution generation.
 * @property {number} hr_scale - The scale for high resolution generation.
 * @property {string} hr_upscaler - The upscaler for high resolution generation.
 * @property {number} hr_second_pass_steps - The number of steps for the second pass in high resolution generation.
 * @property {number} hr_resize_x - The x-axis resize value for high resolution generation.
 * @property {number} hr_resize_y - The y-axis resize value for high resolution generation.
 * @property {string} hr_sampler_name - The sampler name for high resolution generation.
 * @property {string} hr_prompt - The prompt for high resolution generation.
 * @property {string} hr_negative_prompt - The negative prompt for high resolution generation.
 * @property {number} denoising_strength - The denoising strength for high resolution generation.
 * @property {string|null} refiner_checkpoint - The checkpoint for the refiner.
 * @property {number} refiner_switch_at - The switch at value for the refiner.
 * @property {boolean} do_not_save_samples - Whether to not save generated samples.
 * @property {boolean} do_not_save_grid - Whether to not save the generated grid.
 * @property {boolean} save_images - Whether to save the generated images.
 * @property {boolean} send_images - Whether to send the generated images.
 */

/**
  * @typedef {Object} ModelData
  * @property {string} title - The title of the data.
  * @property {string} model_name - The model name of the data.
  * @property {string} filename - The filename of the data.
  * @property {string} hash - The hash of the data.
  * @property {string} sha256 - The SHA256 of the data.
  * @property {string} config - The configuration of the data.
*/

/**
  * @typedef {Object} Sampler
  * @property {string} name - The name of the sampler.
  * @property {string[]} aliases - The aliases of the sampler.
  * @property {Object} [options] - The options for the sampler.
  * @property {string} options.fugiat_4 - The fugiat_4 option for the sampler.
  * @property {string} options.dob81 - The dob81 option for the sampler.
  * @property {string} options.in866 - The in866 option for the sampler.
*/

/**
  * @typedef {Object} UpScaler
  * @property {string} name - The name of the upscaler.
  * @property {string} model_name - The model name of the upscaler.
  * @property {string} model_path - The model path of the upscaler.
  * @property {string} model_url - The model URL of the upscaler.
  * @property {number} scale - The scale of the upscaler.
*/

/**
  * @typedef {Object} GenerationResponse
  * @property {string[]} images - The images of the generation response.
  * @property {Object} parameters - The parameters of the generation response.
  * @property {string} info - The info of the generation response.
  *
*/

/**
 * @typedef {Object} GenerationResponseInfo
 * @property {string[]} all_negative_prompts - The all negative prompts of the generation response info.
 * @property {string[]} all_prompts - The all prompts of the generation response info.
 * @property {number[]} all_seeds - The all seeds of the generation response info.
 * @property {number[]} all_subseeds - The all subseeds of the generation response info.
 * @property {number} batch_size - The batch size of the generation response info.
 * @property {number} cfg_scale - The cfg scale of the generation response info.
 * @property {number} clip_skip - The clip skip of the generation response info.
 * @property {number} denoising_strength - The denoising strength of the generation response info.
 * @property {Object} extra_generation_params - The extra generation params of the generation response info.
 * @property {string|null} face_restoration_model - The face restoration model of the generation response info.
 * @property {boolean} height - The height of the generation response info.
 * @property {number} index_of_first_image - The index of the first image of the generation response info.
 * @property {string[]} infotexts - The infotexts of the generation response info.
 * @property {boolean} is_using_inpainting_conditioning - Whether the generation response info is using inpainting conditioning.
 * @property {string} job_timestamp - The job timestamp of the generation response info.
 * @property {string} negative_prompt - The negative prompt of the generation response info.
 * @property {string} prompt - The prompt of the generation response info.
 * @property {boolean} restore_faces - Whether the generation response info is restoring faces.
 * @property {string} sampler_name - The sampler name of the generation response info.
 * @property {string} sd_model_hash - The SD model hash of the generation response info.
 * @property {string} sd_model_name - The SD model name of the generation response info.
 * @property {string} sd_vae_hash - The  hash of the VAE response info.
 * @property {string} sd_vae_name - The name of the VAE response info.
 * @property {number} seed - The seed of the generation response info.
 * @property {number} seed_resize_from_h - The seed resize from h of the generation response info.
 * @property {number} seed_resize_from_w - The seed resize from w of the generation response info.
 * @property {number} steps - The steps of the generation response info.
 * @property {string[]} styles - The styles of the generation response info.
 * @property {number} subseed - The subseed of the generation response info.
 * @property {number} subseed_strength - The subseed strength of the generation response info.
 * @property {number} version - The version of the generation response info.
 * @property {number} width - The width of the generation response info.
*/

/**
  * @typedef {Object} GenerationResponseWithInfo\
  * @property {string[]} images - The images of the generation response.
  * @property {Object} parameters - The parameters of the generation response.
  * @property {GenerationResponseInfo} info - The info of the generation response.
  *
*/

/**
 * @typedef {Object} Style
 * @property {string} name - The name of the style.
 * @property {string} prompt - The prompt of the style.
 * @property {string} negative_prompt - The negative prompt of the style.
 *
 */
