const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  developer: {
    type: String,
    required: [true, 'Developer role is required'],
    trim: true
  },
  yearOfExperience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: 0
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  country: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 