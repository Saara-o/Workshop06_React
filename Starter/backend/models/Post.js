const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    // Add title field with String type, required validation, trim, and minlength
    title: {
      type: String,
      required: true,
      trim: true,
      minlenght: 5,
    },
    // Add content field with String type, required validation, trim, and minlength
    content: {
      type: String,
      required: true,
      trim: true,
      minlenght: 10,
    },
    // Add author field with String type, required validation, and trim
    author: {
      type: String,
      required: true,
      trim: true,
      minlenght: 2,
    }
  },
  {
    // Enable timestamps to track creation and update times
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);