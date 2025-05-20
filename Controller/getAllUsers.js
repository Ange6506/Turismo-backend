// controllers/userController.js
const db = require('../Conexion');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, nombre_usuario, rol_id FROM usuarios';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al obtener los usuarios',
        error: err
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'No hay usuarios registrados'
      });
    }

    res.status(200).json({
      message: 'Usuarios obtenidos correctamente',
      users: results
    });
  });
};
