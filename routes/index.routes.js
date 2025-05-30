const express = require('express');
const FileModel = require('../models/File');

const router = express.Router();

router.get('/home', async (req, res) => {
  const files = await FileModel.find({ uploadedBy: req.user.id });
  res.render('home', { files });
});

module.exports = router;
