const db = require('../database/db');

exports.createEvent = (req, res) => {
  const { user_id, titulo, descripcion, fecha_inicio, fecha_fin } = req.body;
  db.query(
    'INSERT INTO calendar_events (user_id, titulo, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)',
    [user_id, titulo, descripcion, fecha_inicio, fecha_fin],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Evento creado', eventId: result.insertId });
    }
  );
};

exports.getEvents = (req, res) => {
  const { user_id } = req.params;
  db.query(
    'SELECT * FROM calendar_events WHERE user_id = ? ORDER BY fecha_inicio DESC',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
