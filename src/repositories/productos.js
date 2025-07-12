import model from '../models/producto.js'
import RepositoryBase from './base.js'

const repository = new RepositoryBase(model);

repository.findSimilar = async (id) => {
    const producto = await model.findByPk(id);
    if (!producto) return [];

    return await model.findAll({
        where: { categoriaId: producto.categoriaId },
        limit: 5
    });
};

repository.addProduct = async (data) => {
    return await model.create(data);
};

repository.updateStock = async (productId, quantity) => {
    const product = await model.findByPk(productId);
    if (!product) throw new Error('Producto no encontrado');
    product.stock += quantity;
    await product.save();
    return product;
};

export default repository;
