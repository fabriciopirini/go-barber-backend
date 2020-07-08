import { diskStorage } from 'multer'
import path from 'path'
import { randomBytes } from 'crypto'

const directory = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory,
  storage: diskStorage({
    destination: directory,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
