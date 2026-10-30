const express = require('express')
const multer = require('multer')
const cloudinary = require('../utils/cloudinary')
const GalleryImage = require('../models/GalleryImage')
const requireAdmin = require('../middleware/auth')

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
})

// Public: list all images, newest first
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 })
    res.json(images)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to load gallery' })
  }
})

// Admin: upload an image
router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'An image file is required' })
  }

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'abc-tent-services' }, (err, uploaded) =>
          err ? reject(err) : resolve(uploaded)
        )
        .end(req.file.buffer)
    })

    const image = await GalleryImage.create({
      url: result.secure_url,
      publicId: result.public_id,
      caption: req.body.caption || '',
    })
    res.status(201).json(image)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Upload failed' })
  }
})

// Admin: delete an image
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id)
    if (!image) {
      return res.status(404).json({ message: 'Image not found' })
    }
    await cloudinary.uploader.destroy(image.publicId)
    await image.deleteOne()
    res.json({ message: 'Image deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Delete failed' })
  }
})

module.exports = router