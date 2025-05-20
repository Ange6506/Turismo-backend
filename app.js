require('dotenv').config();  // Carga variables .env al inicio
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/usuariosRoutes');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || '*'; // Puedes definirlo en .env

// Configura CORS para aceptar solo peticiones desde el frontend (más seguro)
app.use(cors({
  origin: FRONTEND_URL
}));

app.use(express.json());

app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
