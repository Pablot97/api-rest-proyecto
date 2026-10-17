const request = require("supertest");
const app = require("../app");

describe("API REST", () => {

  test("GET /authors debe devolver los autores", async () => {
    const response = await request(app)
      .get("/authors");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /authors/:id debe devolver un autor", async () => {
    const response = await request(app)
      .get("/authors/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test("GET /authors/:id debe devolver 404 si el autor no existe", async () => {
    const response = await request(app)
      .get("/authors/9999");

    expect(response.statusCode).toBe(404);
  });

  test("POST /authors debe crear un autor", async () => {
  const email = `autor.${Date.now()}@example.com`;

  const response = await request(app)
    .post("/authors")
    .send({
      name: "Autor Test",
      email: email,
      bio: "Autor creado desde test"
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe("Autor Test");
}); 

  test("POST /authors debe validar el nombre", async () => {
    const response = await request(app)
      .post("/authors")
      .send({
        name: "",
        email: "otro.test@example.com"
      });

    expect(response.statusCode).toBe(400);
  });

  test("GET /posts debe devolver los posts", async () => {
    const response = await request(app)
      .get("/posts");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /posts debe crear un post", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Post desde test",
        content: "Contenido del post desde test",
        author_id: 1,
        published: true
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Post desde test");
  });

  test("DELETE /posts/:id debe devolver 404 si el post no existe", async () => {
    const response = await request(app)
      .delete("/posts/9999");

    expect(response.statusCode).toBe(404);
  });

});

const pool = require("../db");

afterAll(async () => {
  await pool.end();
});