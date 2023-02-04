const path = require('path')
const { v4: uuidv4 } = require('uuid')
const extValid = ['jpg', 'jpeg', 'png']
const fs = require('fs')

const upLoadImage = (
    files,
    folder = '',
    extensionValidas = extValid,
    nombreArchivo = ''
) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        if (!extensionValidas.includes(extension.toLowerCase())) {
            return reject(
                new Error(
                    `invalid image format, valid formats are ${extensionValidas}`
                )
            )
        }

        const nombreUuid =
            nombreArchivo === ''
                ? uuidv4() + '.' + extension
                : nombreArchivo + '.' + extension

        const uploadPath = path.join(
            __dirname,
            '../resources/',
            folder,
            nombreUuid
        )
        archivo.mv(uploadPath, err => {
            if (err) {
                return reject(err)
            }
            resolve(nombreUuid)
        })
    })
}

const deleteImage = (nameImage, folder = '') => {
    if (nameImage) {
        const pathImagen = path.join(
            __dirname,
            '../resources/',
            folder,
            nameImage
        )
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }
}

const getImagePath = (nameImage, folder = '') => {
    if (!nameImage) {
        return false
    }
    const pathImagen = path.join(__dirname, '../resources/', folder, nameImage)
    if (fs.existsSync(pathImagen))
        return fs.readFileSync(pathImagen, { encoding: 'base64' })
}

module.exports = {
    upLoadImage,
    deleteImage,
    getImagePath
}
