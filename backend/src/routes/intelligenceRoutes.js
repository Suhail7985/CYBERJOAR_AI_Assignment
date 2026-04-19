const express = require('express');
const router = express.Router();
const {
  getIntelligence,
  createIntelligence,
  getAISummary
} = require('../controllers/intelligenceController');

router.route('/')
  .get(getIntelligence)
  .post(createIntelligence);

router.route('/bulk')
  .post(require('../controllers/intelligenceController').bulkCreateIntelligence);

router.route('/upload')
  .post(require('../controllers/intelligenceController').uploadImage);

router.route('/:id/summary')
  .get(getAISummary);

module.exports = router;
