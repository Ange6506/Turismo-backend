// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controller/userController');
const { getAllUsers } = require('../Controller/getAllUsers');
const { deleteUser } = require('../Controller/delateUser');
const { updateUser } = require('../Controller/updateUser');
const { getRoles } = require('../Controller/getRoles');
const { Register_Admin } = require('../Controller/Register_Admin');
const controller = require('../Controller/toursController');

const { body } = require('express-validator');

// Ruta de registro de usuario
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('El usuario es requerido'),
    body('contraseña').notEmpty().withMessage('La contraseña es requerida'),
  ],
  registerUser
);


router.get('/getTours', controller.getTours);
router.post('/createTour', controller.createTour);
router.put('/updateTour/:id', controller.updateTour);
router.delete('/deleteTour/:id', controller.deleteTour);

// Ruta de login de usuario
router.post('/login', loginUser);

// Ruta para obtener todos los usuarios
router.get('/getAllUsers', getAllUsers);

// Ruta para eliminar un usuario por su id
router.delete('/delete/:id', deleteUser);   // Ahora el id será pasado en la URL como parámetro

// Ruta para actualizar solo el rol del roles
router.put('/updateRole/:id', updateUser);

// Ruta para obtener todos los roles
router.get('/getRoles', getRoles);

router.post('/Register_Admin', Register_Admin);

module.exports = router;
