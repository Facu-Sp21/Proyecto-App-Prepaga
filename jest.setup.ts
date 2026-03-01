import dotenv from "dotenv";
import { initDB, closeDB } from "./src/DB/connection";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await closeDB(); // la función que cierre el pool
});