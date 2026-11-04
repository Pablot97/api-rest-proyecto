
const express = require("express");
const authorsService = require("../services/authors.service");

const router = express.Router();

// Obtener todos los autores
router.get("/", async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();

    res.json(authors);
  } catch (error) {
    next(error);
  }
});

// Obtener un autor por ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const author = await authorsService.getAuthorById(id);

    res.json(author);
  } catch (error) {
    next(error);
  }
});

// Crear un autor
router.post("/", async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    const author = await authorsService.createAuthor(
      name,
      email,
      bio
    );

    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
});

// Actualizar un autor
router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, email, bio } = req.body;

    const author = await authorsService.updateAuthor(
      id,
      name,
      email,
      bio
    );

    res.json(author);
  } catch (error) {
    next(error);
  }
});

// Eliminar un autor
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await authorsService.deleteAuthor(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
