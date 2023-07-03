const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  workplace: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: { type: String, required: true },
  qualifications: { type: String, required: true },
  skills: { type: Array, required: true },
  questions: { type: Array, required: true },
  range: { type: String, required: true },
  vacancies: { type: String, required: true },
  applications: { type: String, required: true },
  ctc: { type: String, required: true },
  budget: { type: String, required: true },
  payout: { type: String, required: true },
});

module.exports = mongoose.model('Job', jobSchema);