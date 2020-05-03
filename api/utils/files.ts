import * as fs from 'fs'
import * as path from 'path'
import { FileUpload } from "graphql-upload";

export const saveFile = (file: FileUpload, fileName?: string) => {
  return new Promise((resolve, reject) => {
    file.createReadStream().pipe(fs.createWriteStream(path.join(__dirname, fileName || file.filename))).on("close", () => resolve()).on("error", (err) => reject(err))
  })

}