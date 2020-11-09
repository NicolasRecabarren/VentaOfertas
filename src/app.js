import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import usersRoutes from './routes/users';
import rolesRoutes from './routes/roles';

const app = express();

// Middlewares here
app.use( morgan('dev') );
app.use( cors() );
app.use( json() );
app.use( urlencoded({extended: false}) );

// Routes here
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);

export default app;