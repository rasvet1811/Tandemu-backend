const db = require('../database/db');

exports.createFile = (req, res) => {
  const { user_id, materia, descripcion } = req.body;
  const archivo_url = req.file ? req.file.path.replace(/\\/g, "/") : null;
  db.query(
    'INSERT INTO materias_files (user_id, materia, archivo_url, descripcion) VALUES (?, ?, ?, ?)',
    [user_id, materia, archivo_url, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Archivo de materia creado', fileId: result.insertId });
    }
  );
};

exports.getFiles = (req, res) => {
  const { user_id } = req.params;
  db.query(
    'SELECT * FROM materias_files WHERE user_id = ? ORDER BY created_at DESC',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
