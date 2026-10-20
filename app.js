const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ====================
// AUTHORS
// ====================

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM authors ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los autores"
    });
  }
});

app.get("/authors/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Autor no encontrado"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el autor"
    });
  }
});

app.post("/authors", async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "El nombre es obligatorio"
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        error: "El email es obligatorio"
      });
    }

    const emailExistente = await pool.query(
      "SELECT * FROM authors WHERE email = $1",
      [email]
    );

    if (emailExistente.rows.length > 0) {
      return res.status(400).json({
        error: "El email ya está registrado"
      });
    }

    const result = await pool.query(
      `INSERT INTO authors (name, email, bio)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, bio || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el autor"
    });
  }
});

app.put("/authors/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "El nombre es obligatorio"
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        error: "El email es obligatorio"
      });
    }

    const autorExistente = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [id]
    );

    if (autorExistente.rows.length === 0) {
      return res.status(404).json({
        error: "Autor no encontrado"
      });
    }

    const emailExistente = await pool.query(
      "SELECT * FROM authors WHERE email = $1 AND id != $2",
      [email, id]
    );

    if (emailExistente.rows.length > 0) {
      return res.status(400).json({
        error: "El email ya está registrado"
      });
    }

    const result = await pool.query(
      `UPDATE authors
       SET name = $1,
           email = $2,
           bio = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, bio || null, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el autor"
    });
  }
});

app.delete("/authors/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM authors WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Autor no encontrado"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al eliminar el autor"
    });
  }
});

// ====================
// POSTS
// ====================

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los posts"
    });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el post"
    });
  }
});

app.get("/posts/author/:authorId", async (req, res) => {
  try {
    const authorId = Number(req.params.authorId);

    const authorResult = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [authorId]
    );

    if (authorResult.rows.length === 0) {
      return res.status(404).json({
        error: "Autor no encontrado"
      });
    }

    const postsResult = await pool.query(
      "SELECT * FROM posts WHERE author_id = $1 ORDER BY id",
      [authorId]
    );

    res.json({
      author: authorResult.rows[0],
      posts: postsResult.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los posts del autor"
    });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "El título es obligatorio"
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        error: "El contenido es obligatorio"
      });
    }

    if (!author_id) {
      return res.status(400).json({
        error: "El author_id es obligatorio"
      });
    }

    const authorResult = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [author_id]
    );

    if (authorResult.rows.length === 0) {
      return res.status(400).json({
        error: "El autor no existe"
      });
    }

    const result = await pool.query(
      `INSERT INTO posts
       (title, content, author_id, published)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, author_id, published ?? false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el post"
    });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, content, author_id, published } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "El título es obligatorio"
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        error: "El contenido es obligatorio"
      });
    }

    if (!author_id) {
      return res.status(400).json({
        error: "El author_id es obligatorio"
      });
    }

    const postExistente = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );

    if (postExistente.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado"
      });
    }

    const authorResult = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [author_id]
    );

    if (authorResult.rows.length === 0) {
      return res.status(400).json({
        error: "El autor no existe"
      });
    }

    const result = await pool.query(
      `UPDATE posts
       SET title = $1,
           content = $2,
           author_id = $3,
           published = $4
       WHERE id = $5
       RETURNING *`,
      [title, content, author_id, published ?? false, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el post"
    });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al eliminar el post"
    });
  }
});

// ====================
// SERVIDOR
// ====================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
  });
}

module.exports = app;