const express = require('express');
const router = express.Router();
const {
  getIntelligence,
  createIntelligence,
  getAISummary,
  bulkCreateIntelligence,
  uploadImage
} = require('../controllers/intelligenceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // All intelligence routes are now protected

router.route('/')
  .get(getIntelligence)
  .post(createIntelligence);

router.post('/bulk', authorize('Commander'), bulkCreateIntelligence);
router.post('/upload', uploadImage);
router.get('/:id/summary', authorize('Analyst', 'Commander'), getAISummary);

module.exports = router;
