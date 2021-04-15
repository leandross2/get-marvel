import multer from 'multer'
import { resolve } from 'path'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '../', '../', 'tmp'),
    filename(request, file, callback) {
      const fileHash = `${file.originalname}-${Number(new Date())}`
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}