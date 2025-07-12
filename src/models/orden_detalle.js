import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Orden from './orden.js';
import Producto from './producto.js';

const OrdenDetalle = sequelize.define('orden_detalle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ordenId: {
    field: 'ordenid', // Mapea el atributo ordenId a la columna ordenid
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ordenes',
      key: 'id'
    }
  },
  productoId: {
    field: 'productoid', // Mapea el atributo productoId a la columna productoid
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos',
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'orden_detalle',
  timestamps: false
});

OrdenDetalle.belongsTo(Orden, { foreignKey: 'ordenId', as: 'orden' });
Orden.hasMany(OrdenDetalle, { foreignKey: 'ordenId', as: 'detalles' });
OrdenDetalle.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });
Producto.hasMany(OrdenDetalle, { foreignKey: 'productoId', as: 'ordenesDetalle' });

export default OrdenDetalle;
