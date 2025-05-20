const db = require('../Conexion');
const { validationResult } = require('express-validator');

// Registrar usuario (Sin encriptar)
exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, contraseña } = req.body;

  // Asignar el rol 'Turista' (asumiendo que el rol de 'Turista' tiene id 1)
  const rolId = 1;  // Cambia esto si el id de "Turista" es diferente

  // Insertar el usuario con el rol 'Turista'
  const sql = 'INSERT INTO usuarios (nombre_usuario, contraseña, rol_id) VALUES (?, ?, ?)';
  db.query(sql, [username, contraseña, rolId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al registrar', error: err });
    
    // Responder con un mensaje de éxito y el ID del usuario insertado
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  });
};

// Iniciar sesión (Sin encriptar)
exports.loginUser = (req, res) => {
  const { username, contraseña } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?';
  db.query(sql, [username, contraseña], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al buscar usuario', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = results[0]; // El usuario encontrado
    res.status(200).json({ message: `Inicio de sesión exitoso`, user: { id: user.id, nombre_usuario: user.nombre_usuario, rol_id: user.rol_id } });
  });
};
