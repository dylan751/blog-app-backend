const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: 'string', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Category', CategorySchema);
