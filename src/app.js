import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//import productsRoutes from './routes/products';

const app = express();

// Middlewares here
app.use( morgan('dev') );
app.use( cors() );
app.use( json() );
app.use( urlencoded({extended: false}) );

// Routes here
//app.use('/api/products', productsRoutes);

export default app;