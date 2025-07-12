import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import productosRouter from './src/routes/productos.js';
import usersRouter from './src/routes/users.js';
import loginRouter from './src/routes/login.js';
import categoriasRouter from './src/routes/categorias.js';
import ordenesRouter from './src/routes/ordenes.js';
import stockRouter from './src/routes/stock.js';

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) =>  {
    return res.json({message: "hellow world"})
})



app.use('/productos', productosRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/categorias', categoriasRouter);
app.use('/ordenes', ordenesRouter);
app.use('/productos/stock', stockRouter);

export default app;