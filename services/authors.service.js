
const pool = require("../db");

// Obtener todos los autores
async function getAllAuthors() {
  const result = await pool.query(
    "SELECT * FROM authors ORDER BY id"
  );

  return result.rows;
}

// Obtener un autor por su ID
async function getAuthorById(id) {
  const result = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    const error = new Error("Autor no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
}

// Crear un autor
async function createAuthor(name, email, bio) {
  if (!name || name.trim() === "") {
    const error = new Error("El nombre es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (!email || email.trim() === "") {
    const error = new Error("El email es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const emailExistente = await pool.query(
    "SELECT * FROM authors WHERE email = $1",
    [email]
  );

  if (emailExistente.rows.length > 0) {
    const error = new Error("El email ya está registrado");
    error.statusCode = 400;
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, bio || null]
  );

  return result.rows[0];
}

// Actualizar un autor
async function updateAuthor(id, name, email, bio) {
  if (!name || name.trim() === "") {
    const error = new Error("El nombre es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  if (!email || email.trim() === "") {
    const error = new Error("El email es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const autorExistente = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );

  if (autorExistente.rows.length === 0) {
    const error = new Error("Autor no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const emailExistente = await pool.query(
    "SELECT * FROM authors WHERE email = $1 AND id != $2",
    [email, id]
  );

  if (emailExistente.rows.length > 0) {
    const error = new Error("El email ya está registrado");
    error.statusCode = 400;
    throw error;
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

  return result.rows[0];
}

// Eliminar un autor
async function deleteAuthor(id) {
  const result = await pool.query(
    "DELETE FROM authors WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    const error = new Error("Autor no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
