
const express = require("express");
const postsService = require("../services/posts.service");

const router = express.Router();

// Obtener todos los posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Obtener un post por ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const post = await postsService.getPostById(id);

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Obtener posts de un autor
router.get("/author/:authorId", async (req, res, next) => {
  try {
    const authorId = Number(req.params.authorId);

    const result = await postsService.getPostsByAuthor(authorId);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Crear un post
router.post("/", async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;

    const post = await postsService.createPost(
      title,
      content,
      author_id,
      published
    );

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Actualizar un post
router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, content, author_id, published } = req.body;

    const post = await postsService.updatePost(
      id,
      title,
      content,
      author_id,
      published
    );

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Eliminar un post
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await postsService.deletePost(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
