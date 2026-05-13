const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please add a role']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  bio: {
    type: String,
    required: [true, 'Please add a short bio']
  },
  avatar: {
    type: String,
    default: 'https://i.pravatar.cc/150'
  },
  skills: {
    type: [String],
    default: []
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);