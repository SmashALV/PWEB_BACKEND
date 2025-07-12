import express from 'express';
import controller from '../controllers/stock.js';

const router = express.Router();

router.post('/add', controller.addProduct);

export default router;
