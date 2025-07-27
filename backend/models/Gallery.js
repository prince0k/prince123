const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String }, // For blog text or description
  image: { type: String }, // Image URL or base64
  type: { type: String, enum: ['image', 'blog', 'activity'], default: 'image' },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

gallerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema); 