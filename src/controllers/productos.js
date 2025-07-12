import repository from '../repositories/productos.js'
import Categoria from '../models/categoria.js';

const findAll = async (req, res) => {
    try {
        const result = await repository.findAll({ include: [{ model: Categoria, as: 'categoria' }] });
        // Mapear los productos al formato esperado por el frontend
        const mapped = result.map(producto => ({
            id: producto.id,
            name: producto.nombre,
            categoria: producto.categoria ? producto.categoria.nombre : '',
            precioConDescuento: (producto.precioConDescuento ?? producto.precio) + ' x kg',
            price: producto.precioConDescuento ?? producto.precio,
            img: producto.img,
            stock: producto.stock,
            descripcion: producto.descripcion
        }));
        return sendResults(mapped, res);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error interno al obtener productos', details: error.message });
    }
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResults(result,res);
}

const create = async (req, res) => {
    const payload = req.body;
    // Validación básica
    if (!payload.nombre || !payload.precio || !payload.categoria) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, precio, categoria' });
    }
    try {
        const result = await repository.create(payload);
        return sendResults(result, res);
    } catch (err) {
        return res.status(500).json({ error: 'Error al crear producto' });
    }
}

const update = async (req, res) => {
    const payload = req.body;
    if (!payload.id || !payload.nombre || !payload.precio || !payload.categoria) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: id, nombre, precio, categoria' });
    }
    try {
        const result = await repository.update(payload);
        return sendResults(result, res);
    } catch (err) {
        return res.status(500).json({ error: 'Error al actualizar producto' });
    }
}

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);
    return sendResults(result,res);
}

const findSimilar = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await repository.findSimilar(id);
        const mapped = result.map(producto => ({
            id: producto.id,
            name: producto.nombre,
            categoria: producto.categoria ? producto.categoria.nombre : '',
            precioConDescuento: producto.precioConDescuento ?? producto.precio,
            price: producto.precioConDescuento ?? producto.precio,
            img: producto.img,
            stock: producto.stock,
            descripcion: producto.descripcion
        }));
        return sendResults(mapped, res);
    } catch (error) {
        console.error('Error al obtener productos similares:', error);
        return res.status(500).json({ error: 'Error interno al obtener productos similares', details: error.message });
    }
};

const updateStock = async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: productId, quantity' });
    }
    try {
        const result = await repository.updateStock(productId, quantity);
        return sendResults(result, res);
    } catch (error) {
        console.error('Error al actualizar stock:', error);
        return res.status(500).json({ error: 'Error interno al actualizar stock', details: error.message });
    }
};

const sendResults = (result, res) => {
    if(result === null || result === undefined) {
        return res.status(404).json({message: 'Not found'});
    }
    return res.json(result);
}

export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    findSimilar,
    updateStock
}
