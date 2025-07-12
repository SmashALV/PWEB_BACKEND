import repository from '../repositories/stock.js';

const addProduct = async (req, res) => {
    const { nombre, categoriaId, precio, descripcion, img, stock } = req.body;
    if (!nombre || !categoriaId || !precio || !stock) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, categoriaId, precio, stock' });
    }
    try {
        const result = await repository.addProduct({ nombre, categoriaId, precio, descripcion, img, stock });
        return res.json(result);
    } catch (error) {
        console.error('Error al agregar producto:', error);
        return res.status(500).json({ error: 'Error interno al agregar producto', details: error.message });
    }
};

export default {
    addProduct
};
