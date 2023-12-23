import { registerCommands } from './commands.js'
import { setupSettings } from './settings.js'

const main = async () => {
  const sillyTavernContext = window.SillyTavern.getContext()
  console.log('st-sd-webui-api: sillyTavernContext', sillyTavernContext)
  setupSettings()
  registerCommands()
}

main()
  .then(() => console.log('st-sd-webui-api: success'))
  .catch((error) => console.error(error))
