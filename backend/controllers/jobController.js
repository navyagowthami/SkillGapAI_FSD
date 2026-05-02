const JobRole = require('../models/JobRole');

// @desc    Get all job roles
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await JobRole.find().populate('requiredSkills');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
};
