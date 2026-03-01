import dotenv from "dotenv";
import app from "./app.js";
import { initDB } from './DB/connection.js';

const env = process.env.NODE_ENV || "development";

dotenv.config({
  path: env === "test" ? ".env.test" : ".env"
});

await initDB();

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

app.listen(3000, () => {
  console.log(`Server running on port 3000 [${env}]`);
});