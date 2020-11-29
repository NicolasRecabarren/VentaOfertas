import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import filesRoutes from './routes/files';
import usersRoutes from './routes/users';
import rolesRoutes from './routes/roles';
import productsRoutes from './routes/products';
import productCategoriesRoutes from './routes/product_categories';

const app = express();

// Middlewares here
app.use( morgan('dev') );
app.use( cors() );
app.use( json() );
app.use( urlencoded({extended: false}) );

// Routes here
app.use('/api/files', filesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/product_categories', productCategoriesRoutes);

export default app;