import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const config = {
  api_key: process.env.API_KEY,
  port: process.env.PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_host: process.env.DB_HOST
}