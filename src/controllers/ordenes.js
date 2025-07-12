import * as repo from '../repositories/ordenes.js';

export const getAll = async (req, res) => {
  try {
    const ordenes = await repo.getAll();
    res.json(ordenes);
  } catch (err) {
    console.log('Error en GET /ordenes:', err);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

export const getById = async (req, res) => {
  try {
    const orden = await repo.getById(req.params.id);
    if (!orden) {
      console.log('Orden no encontrada para id:', req.params.id);
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json(orden);
  } catch (err) {
    console.log('Error en GET /ordenes/:id:', err);
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
};

export const create = async (req, res) => {
  try {
    console.log('Intentando crear orden con body:', req.body);
    const nueva = await repo.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.log('Error en POST /ordenes:', err);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

export const remove = async (req, res) => {
  try {
    const eliminada = await repo.remove(req.params.id);
    if (!eliminada) {
      console.log('Intento de eliminar orden no encontrada, id:', req.params.id);
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json({ message: 'Orden eliminada' });
  } catch (err) {
    console.log('Error en DELETE /ordenes/:id:', err);
    res.status(500).json({ error: 'Error al eliminar la orden' });
  }
};
