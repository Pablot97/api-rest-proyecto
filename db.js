
require("dotenv").config();

const { Pool } = require("pg");

console.log("Configuración de base de datos:", {
  host: process.env.DB_HOST || "NO CONFIGURADO",
  database: process.env.DB_NAME || "NO CONFIGURADO",
  user: process.env.DB_USER || "NO CONFIGURADO",
  port: process.env.DB_PORT || "NO CONFIGURADO"
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432
});

module.exports = pool;
