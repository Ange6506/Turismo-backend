const db = require('../Conexion');

// Obtener todos los tours
exports.getTours = (req, res) => {
  const sql = 'SELECT * FROM tours';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener tours', error: err });
    res.status(200).json({ message: 'Tours obtenidos correctamente', tours: results });
  });
};

// Crear un nuevo tour
exports.createTour = (req, res) => {
  const { nombre, descripcion, precio, duracion, categoria } = req.body;

  const sql = 'INSERT INTO tours (nombre, descripcion, precio, duracion, categoria) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, precio, duracion, categoria], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear tour', error: err });
    res.status(201).json({ message: 'Tour creado correctamente', id: result.insertId });
  });
};

// Editar tour
exports.updateTour = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, duracion, categoria } = req.body;

  const sql = 'UPDATE tours SET nombre=?, descripcion=?, precio=?, duracion=?, categoria=? WHERE id=?';
  db.query(sql, [nombre, descripcion, precio, duracion, categoria, id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar tour', error: err });
    res.status(200).json({ message: 'Tour actualizado correctamente' });
  });
};


// Eliminar tour
exports.deleteTour = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tours WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar tour', error: err });
    res.status(200).json({ message: 'Tour eliminado correctamente' });
  });
};
