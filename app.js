
const express = require("express");
const authorsRoutes = require("./routes/authors.routes");
const postsRoutes = require("./routes/posts.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// ====================
// SERVIDOR
// ====================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
  });
}

module.exports = app;
