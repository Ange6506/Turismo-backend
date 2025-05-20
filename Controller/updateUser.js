// controllers/updateUserRole.js
const db = require('../Conexion');

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { rol_id } = req.body;

  if (isNaN(id) || !rol_id) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }

  const sql = 'UPDATE usuarios SET rol_id = ? WHERE id = ?';

  db.query(sql, [rol_id, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el rol', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Rol actualizado correctamente' });
  });
};
