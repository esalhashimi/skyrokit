const mongoose = require('mongoose');
// Embeded Docs
const applicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
    required: true,
  },
});

// Model
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  applications: [applicationSchema],
});
// then we register the model with mongoose
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;
