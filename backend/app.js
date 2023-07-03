require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

mongoose.connect('mongodb+srv://sarthaks:alskdjfhg1029384756@cluster0.1krowz2.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));
app.use('/jobs', require('./routes/jobs'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));