const db = require('../database/db');

// Crear o actualizar perfil
exports.upsertProfile = (req, res) => {
  const { user_id, nombre, telefono, semestre, planes_estudio, servicios } = req.body;
  const imagen = req.file ? req.file.path.replace(/\\/g, "/") : null;

  // Si existe, actualiza; si no, crea
  db.query(
    `INSERT INTO user_profiles (user_id, nombre, imagen, telefono, semestre, planes_estudio, servicios)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
     nombre=VALUES(nombre), imagen=VALUES(imagen), telefono=VALUES(telefono), semestre=VALUES(semestre), planes_estudio=VALUES(planes_estudio), servicios=VALUES(servicios)`,
    [user_id, nombre, imagen, telefono, semestre, planes_estudio, servicios],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Perfil actualizado/creado' });
    }
  );
};

// Obtener perfil por user_id
exports.getProfile = (req, res) => {
  const { user_id } = req.params;
  db.query(
    'SELECT * FROM user_profiles WHERE user_id = ?',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
};
