const db = require('../Conexion');

// Obtener todos los roles
exports.getRoles = (req, res) => {
  const sql = 'SELECT id, descripcion FROM roles';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al obtener los roles',
        error: err
      });
    }

    res.status(200).json({
      message: 'Roles obtenidos correctamente',
      roles: results
    });
  });
};
