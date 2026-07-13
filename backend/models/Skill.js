const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend','backend','database','tool'], default: 'frontend' },
  level: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: '' }
});

module.exports = mongoose.model('Skill', skillSchema);
