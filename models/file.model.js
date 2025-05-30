const FileModel = require('../models/file.model');

const file = await FileModel.create({
  url: req.file.path,
  fileType: req.file.mimetype,
  fileName: req.file.originalname,
  uploadedBy: req.userId || 'anonymous',
});
