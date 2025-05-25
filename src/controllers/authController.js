const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'Usuario registrado', userId });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };