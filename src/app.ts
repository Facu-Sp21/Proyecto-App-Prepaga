import express from 'express';
import { afiliadoRouter } from './Afiliado/routes.js'; 
import { planesRouter } from './Planes/routes.js';
import { planesAfiliadoRouter } from './Planes_Afiliado/routes.js';
import { errorHandler } from './Shared/errorsHandler.js';

const app = express();

app.use(express.json());

app.use('/afiliados', afiliadoRouter);
app.use('/planes', planesRouter);
app.use('/AfiliadosPlanes', planesAfiliadoRouter);

app.use(errorHandler);

export default app;