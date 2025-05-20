// controllers/delateUser.js
const db = require('../Conexion');

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const { id } = req.params;  // Obtener el id del usuario desde los parámetros de la URL

  // Validar que el id sea un número
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'ID inválido',
    });
  }

  const sql = 'DELETE FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      return res.status(500).json({
        message: 'Error al eliminar el usuario',
        error: err,
      });
    }

    // Verificar si se encontró el usuario y fue eliminado
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      message: 'Usuario eliminado correctamente',
    });
  });
};
