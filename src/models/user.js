import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre es obligatorio' }
        }
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El apellido es obligatorio' }
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Correo inválido' }
        }
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'La contraseña es obligatoria' }
        }
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cliente'
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'El DNI es obligatorio' }
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activo'
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'fechacreacion' // nombre real en la base de datos
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default User;