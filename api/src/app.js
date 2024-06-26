import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import responseTime from "response-time";

import authRoutes from './routes/auth.routes.js';
import employeesRoutes from './routes/employees.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(responseTime());

app.use("/api", authRoutes);
app.use("/api", employeesRoutes);

export default app;