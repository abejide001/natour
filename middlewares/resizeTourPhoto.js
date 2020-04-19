const sharp = require("sharp")

const resizeTourPhoto = async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next()

    const imageCoverFilename = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${imageCoverFilename}`)
    req.body.imageCover = imageCoverFilename

    req.body.images = []
    await Promise.all(req.files.images.map(async (file, i) => {
        const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/img/tours/${imageCoverFilename}`)
        req.body.images.push(filename)
    }));
    next()
}

module.exports = resizeTourPhoto