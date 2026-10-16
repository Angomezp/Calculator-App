import express from 'express';
import cors from 'cors';
import calculatorRoutes from './routes/calculatorRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', calculatorRoutes);

app.use(errorHandler);

export default app;