import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import usersRoutes from './routes/users';

const app = express();

// Middlewares here
app.use( morgan('dev') );
app.use( cors() );
app.use( json() );
app.use( urlencoded({extended: false}) );

// Routes here
app.use('/api/users', usersRoutes);

export default app;