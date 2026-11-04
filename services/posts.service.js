
const pool = require("../db");

// Obtener todos los posts
async function getAllPosts() {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY id"
  );

  return result.rows;
}

// Obtener un post por ID
async function getPostById(id) {
  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    const error = new Error("Post no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
}

// Obtener posts de un autor
async function getPostsByAuthor(authorId) {
  const authorResult = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [authorId]
  );

  if (authorResult.rows.length === 0) {
    const error = new Error("Autor no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const postsResult = await pool.query(
    "SELECT * FROM posts WHERE author_id = $1 ORDER BY id",
    [authorId]
  );

  return {
    author: authorResult.rows[0],
    posts: postsResult.rows
  };
}

// Crear un post
async function createPost(title, content, author_id, published) {
  if (!title || title.trim() === "") {
    const error = new Error("El título es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (!content || content.trim() === "") {
    const error = new Error("El contenido es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (!author_id) {
    const error = new Error("El author_id es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const authorResult = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [author_id]
  );

  if (authorResult.rows.length === 0) {
    const error = new Error("El autor no existe");
    error.statusCode = 400;
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published ?? false]
  );

  return result.rows[0];
}

// Actualizar un post
async function updatePost(id, title, content, author_id, published) {
  if (!title || title.trim() === "") {
    const error = new Error("El título es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (!content || content.trim() === "") {
    const error = new Error("El contenido es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (!author_id) {
    const error = new Error("El author_id es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const postResult = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  if (postResult.rows.length === 0) {
    const error = new Error("Post no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const authorResult = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [author_id]
  );

  if (authorResult.rows.length === 0) {
    const error = new Error("El autor no existe");
    error.statusCode = 400;
    throw error;
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

  return result.rows[0];
}

// Eliminar un post
async function deletePost(id) {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    const error = new Error("Post no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};
