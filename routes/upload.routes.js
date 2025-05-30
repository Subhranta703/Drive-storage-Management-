const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const FileModel = require('../models/File');
const upload = multer({ storage });

const router = express.Router();

router.post('/upload-file', upload.single('file'), async (req, res) => {
  try {
    const existingFile = await FileModel.findOne({
      fileName: req.file.originalname,
      uploadedBy: req.user.id,
    });

    if (existingFile) {
      return res.status(400).send('Duplicate file not allowed.');
    }

    const file = await FileModel.create({
      fileName: req.file.originalname,
      url: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id,
    });

    console.log('Uploaded file:', req.file);
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

module.exports = router;
