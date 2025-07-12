import * as repo from '../repositories/categorias.js';

export const getAll = async (req, res) => {
  try {
    const categorias = await repo.getAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

export const getById = async (req, res) => {
  try {
    const categoria = await repo.getById(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

export const create = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }
  try {
    const nueva = await repo.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

export const update = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }
  try {
    const actualizada = await repo.update(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};


export const remove = async (req, res) => {
  try {
    const eliminada = await repo.remove(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
