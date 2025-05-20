const { validationResult } = require('express-validator');
const db = require('../Conexion');

exports.Register_Admin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, contraseña, rol_id } = req.body;

  if (!rol_id) {
    return res.status(400).json({ message: 'Rol no proporcionado' });
  }

  const sql = 'INSERT INTO usuarios (nombre_usuario, contraseña, rol_id) VALUES (?, ?, ?)';
  db.query(sql, [username, contraseña, rol_id], (err, result) => {
    if (err) {
      console.error(err);  // Registrar el error
      return res.status(500).json({ message: 'Error al registrar', error: err });
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  });
};
