import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Orden = sequelize.define('orden', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    field: 'userid', // Mapea el atributo userId a la columna userid
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'ordenes',
  timestamps: false
});

Orden.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });
User.hasMany(Orden, { foreignKey: 'userId', as: 'ordenes' });

export default Orden;
