const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },
  documentType: {
    type: String,
    enum: ['panCard', 'aadharCard', 'salarySlip', 'bankStatement', 'itReturn', 'photo', 'other'],
    required: true
  },
  originalName: String,
  filename: String,
  fileUrl: String,
  fileSize: Number,
  mimeType: String,
  status: {
    type: String,
    enum: ['uploaded', 'verified', 'rejected'],
    default: 'uploaded'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);
