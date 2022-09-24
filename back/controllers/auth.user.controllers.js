const userModels = require('../models/user.models');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signup = (req, res, next) => {
  // crypte le mdp
  bcrypt
    .hash(req.body.password, 10)
    // prendre ce nouveau mdp créé et qui va l'injecter dans ce nouveau user
    .then(hash => {
      const user = new userModels({
        email: req.body.email,
        password: hash,
      });
      // Enregistrement de l'utilisateur user dans la base de données
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: '24h',
            }),
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
sqklqkqcsk;
