import model from '../models/producto.js';

const addProduct = async (data) => {
    const product = await model.create(data);
    return product;
};

export default {
    addProduct
};
