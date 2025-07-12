import Orden from '../models/orden.js';
import OrdenDetalle from '../models/orden_detalle.js';
import Producto from '../models/producto.js';

export const getAll = async () => {
  return await Orden.findAll({ include: ['usuario', 'detalles'] });
};

export const getById = async (id) => {
  return await Orden.findByPk(id, { include: ['usuario', 'detalles'] });
};

export const create = async (data) => {
  // data: { userId, fecha, total, productos: [{ productoId, cantidad, precio }] }
  const { userId, fecha, total, productos } = data;
  const orden = await Orden.create({ userId, fecha, total });
  if (productos && productos.length > 0) {
    for (const p of productos) {
      // Asegurarse de usar los nombres correctos del frontend: productoId, cantidad, precio
      await OrdenDetalle.create({ ordenId: orden.id, productoId: p.productoId, cantidad: p.cantidad, precio: p.precio });
      const producto = await Producto.findByPk(p.productoId);
      if (producto) {
        producto.stock -= p.cantidad;
        await producto.save();
      }
    }
  }
  return getById(orden.id);
};

export const remove = async (id) => {
  const orden = await Orden.findByPk(id);
  if (!orden) return null;
  await orden.destroy();
  return orden;
};
