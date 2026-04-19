const mongoose = require('mongoose');

const IntelligenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sourceType: {
    type: String,
    enum: ['OSINT', 'HUMINT', 'IMINT'],
    required: true,
  },
  classification: {
    type: String,
    enum: ['UNCLASSIFIED', 'CONFIDENTIAL', 'SECRET', 'TOP SECRET'],
    default: 'UNCLASSIFIED'
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  // GeoJSON data
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Geospatial index for fast location queries
IntelligenceSchema.index({ location: '2dsphere' });
IntelligenceSchema.index({ sourceType: 1 });
IntelligenceSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Intelligence', IntelligenceSchema);
