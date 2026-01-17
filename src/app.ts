import express from 'express';
import { afiliadoRouter } from './Afiliado/routes.js'; 
import dotenv from "dotenv";
import { initDB } from './DB/connection.js';
import { errorHandler } from './Shared/errorsHandler.js';
dotenv.config();

await initDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Middlewares for Modules
app.use('/afiliados', afiliadoRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})