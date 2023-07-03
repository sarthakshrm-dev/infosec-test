const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const jobController = require('../controllers/jobController');

router.post('/', authMiddleware, jobController.createJob);
router.get('/', authMiddleware, jobController.getUserJobs);

module.exports = router;