const db = require('../db'); // Ajusta la ruta según tu estructura

// Crear publicación
exports.createPost = (req, res) => {
  const { user_id, contenido } = req.body;
  const archivo_url = req.file ? req.file.path : null;

  db.query(
    'INSERT INTO posts (user_id, contenido, archivo_url) VALUES (?, ?, ?)',
    [user_id, contenido, archivo_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Publicación creada', postId: result.insertId });
    }
  );
};

// Mostrar todas las publicaciones
exports.getPosts = (req, res) => {
  db.query(
    `SELECT posts.*, user_profiles.nombre, user_profiles.imagen 
     FROM posts 
     JOIN user_profiles ON posts.user_id = user_profiles.user_id
     ORDER BY posts.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};