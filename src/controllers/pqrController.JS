const db = require('../database/db');

exports.createPQR = (req, res) => {
  const { user_id, tipo, descripcion } = req.body;
  db.query(
    'INSERT INTO pqr (user_id, tipo, descripcion) VALUES (?, ?, ?)',
    [user_id, tipo, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'PQR creada', pqrId: result.insertId });
    }
  );
};

exports.getPQRs = (req, res) => {
  const { user_id } = req.params;
  db.query(
    'SELECT * FROM pqr WHERE user_id = ? ORDER BY created_at DESC',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
