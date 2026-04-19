const Intelligence = require('../models/Intelligence');
const intelligenceService = require('../services/intelligenceService');
const multer = require('multer');
const path = require('path');

const { storage } = require('../config/cloudinary');

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only images are allowed'));
  }
}).single('image');

// @desc    Upload image
// @route   POST /api/intelligence/upload
exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }
    res.status(200).json({
      success: true,
      url: req.file.path // Cloudinary returns the full URL in path
    });
  });
};

// @desc    Bulk create intelligence
// @route   POST /api/intelligence/bulk
exports.bulkCreateIntelligence = async (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, error: 'Expected an array of intelligence items' });
    }
    
    const createdItems = await Intelligence.insertMany(items);
    res.status(201).json({
      success: true,
      count: createdItems.length,
      data: createdItems
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all intelligence entries
// @route   GET /api/intelligence
// @access  Public (for now)
exports.getIntelligence = async (req, res) => {
  try {
    const filters = req.query;
    const items = await intelligenceService.getAllIntelligence(filters);
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create new intelligence entry
// @route   POST /api/intelligence
// @access  Public
exports.createIntelligence = async (req, res) => {
  try {
    const intel = await intelligenceService.createIntelligence(req.body);
    res.status(201).json({
      success: true,
      data: intel
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Mock AI Summary generator
// @route   GET /api/intelligence/:id/summary
exports.getAISummary = async (req, res) => {
  try {
    const item = await Intelligence.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found.' });
    }

    const summaryTemplates = {
      OSINT: [
        `Cross-referencing ${item.title} with open-source feeds reveals a pattern consistent with escalating regional instability. Signal confidence: HIGH.`,
        `Public data aggregation for this event suggests coordinated information suppression. Analyst action recommended within 4 hours.`,
        `OSINT pattern analysis indicates this event is a precursor to logistic mobilization in the target zone.`,
      ],
      HUMINT: [
        `Field source reliability rated ALPHA. The reported activity for "${item.title}" confirms on-ground intelligence from secondary assets. No contradicting signals detected.`,
        `Human intelligence report classified ${item.classification}. Corroborating field sources indicate a 72% confidence window for the described event timeline.`,
        `Source has track record of 89% accuracy for similar events. Cross-referencing with 3 regional HUMINT assets confirms elevated threat posture.`,
      ],
      IMINT: [
        `Imagery analysis of this acquisition reveals sub-surface structural changes inconsistent with civilian operations. Satellite arc coverage aligns with a 6-hour detection window.`,
        `Thermal signature mapping from "${item.title}" exceeds baseline thresholds by 340%. Recommend tasking additional collection assets within 12 hours.`,
        `Spectral analysis of imagery confirms organic heat sources. AI pattern-matching yields 91% similarity to known high-priority targets in the database.`,
      ]
    };

    const templates = summaryTemplates[item.sourceType] || summaryTemplates.OSINT;
    const summary = templates[Math.floor(Math.random() * templates.length)];

    // Simulate realistic AI processing delay
    setTimeout(() => {
      res.status(200).json({ success: true, summary });
    }, 1200);

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

