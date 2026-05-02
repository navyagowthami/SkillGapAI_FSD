const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  history: [{
    jobRole: String,
    jobId: mongoose.Schema.Types.ObjectId,
    matchPercentage: Number,
    atsScore: Number,
    missingSkills: [{ type: String }],
    userSkills: [{ type: String }],
    recommendations: [{
      title: String,
      type: { type: String },
      url: String,
      difficulty: String
    }],
    recommendedJobs: [{
      roleName: String,
      matchPercentage: Number,
      jobId: mongoose.Schema.Types.ObjectId
    }],
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
