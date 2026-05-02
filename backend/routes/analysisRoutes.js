const express = require('express');
const router = express.Router();
const { saveUserSkills, analyzeSkillGap } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.post('/user-skills', protect, saveUserSkills);
router.get('/gap/:jobId', protect, analyzeSkillGap);

module.exports = router;
