import path from 'path'
import getConfig from 'next/config'

const serverPath = (staticFilePath: string) => {
  console.log(getConfig().serverRuntimeConfig.PROJECT_ROOT)
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default serverPath