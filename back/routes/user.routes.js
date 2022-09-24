const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth.user.controllers');
const userController = require('../controllers/user.controllers');

//Authentification
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);

//Utilisateurs
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);

//Téléchargement de photo
router.post(
  '/upload',
  upload.single('file'),
  uploadAuth.isUploadAuth,
  uploadController.uploadProfil
);

module.exports = router;
