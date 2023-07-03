const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, workplace, country, city, type, description, responsibilities, qualifications, skills, questions, range, vacancies, applications, ctc, budget, payout  } = req.body;

    const job = new Job({
      userId: req.userId,
      title,
      workplace,
      country,
      city,
      type,
      description,
      responsibilities,
      qualifications,
      skills,
      questions,
      range,
      vacancies,
      applications,
      ctc,
      budget,
      payout
    });
    await job.save();
    res.status(201).json({ message: 'Job created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};