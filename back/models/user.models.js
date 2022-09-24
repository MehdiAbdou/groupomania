const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Ajouter unique true
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    picture: { type: String, default: './uploads/profil/random-user.png' },
    pseudo: { type: String },
    bio: { type: String, max: 1024 },
    likes: { type: [String] },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
