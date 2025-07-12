import express from 'express'
import controller from '../controllers/productos.js'

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);
router.get('/similar/:id', controller.findSimilar);
router.put('/stock', controller.updateStock);

export default router;
