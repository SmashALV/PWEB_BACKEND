import Categoria from '../models/categoria.js';

export const getAll = async () => {
  return await Categoria.findAll();
};

export const getById = async (id) => {
  return await Categoria.findByPk(id);
};

export const create = async (data) => {
  return await Categoria.create(data);
};

export const update = async (id, data) => {
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return null;
  return await categoria.update(data);
};

export const remove = async (id) => {
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return null;
  await categoria.destroy();
  return categoria;
};

export const addCategory = async (data) => {
  return await Categoria.create(data);
};
