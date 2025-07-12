
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Categoria from './categoria.js';

const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'categoriaid', // <-- nombre real en la base de datos
        references: {
            model: 'categorias',
            key: 'id'
        }
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    precioConDescuento: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'preciocondescuento' // <-- nombre real en la base de datos
    },
    descripcion: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'productos',
    timestamps: false
});

// Asociaciones (después de definir ambos modelos)
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

export default Producto;
