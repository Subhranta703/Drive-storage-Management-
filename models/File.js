const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  fileType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const FileModel = mongoose.model('File', fileSchema);
module.exports = FileModel;
