const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// generate random secret key
const secretKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // transform password in hash and salt it 10 rounds
      .then(hash => {
        const user = new User({ // creation of new User with unique email and hash (password)
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // compare if email corresponds to a database user   
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password) // compare password with user hash in database
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({ // get userId and token of user
              userId: user._id,
              token: jwt.sign( // use sign method of jwt to encode a new token
                { userId: user._id },
                secretKey,
                { expiresIn: "24h" }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.secretKey = secretKey; // export secretKey