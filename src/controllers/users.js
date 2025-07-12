// Validación y manejo de errores para actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, contrasena, rol, dni, estado } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (correo && correo !== user.correo) {
            const existeCorreo = await User.findOne({ where: { correo } });
            if (existeCorreo) {
                return res.status(400).json({ error: 'El correo ya está registrado' });
            }
        }
        if (dni && dni !== user.dni) {
            const existeDni = await User.findOne({ where: { dni } });
            if (existeDni) {
                return res.status(400).json({ error: 'El DNI ya está registrado' });
            }
        }
        await user.update({ nombre, apellido, correo, contrasena, rol, dni, estado });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Validación y manejo de errores para crear usuario
import User from '../models/user.js';

export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena, rol, dni, estado } = req.body;
        if (!nombre || !apellido || !correo || !contrasena || !dni) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        // Validación de email simple
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
            return res.status(400).json({ error: 'Correo inválido' });
        }
        // Validación de longitud de contraseña
        if (contrasena.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }
        // Validación de unicidad de correo y dni
        const existeCorreo = await User.findOne({ where: { correo } });
        if (existeCorreo) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        const existeDni = await User.findOne({ where: { dni } });
        if (existeDni) {
            return res.status(400).json({ error: 'El DNI ya está registrado' });
        }
        const user = await User.create({ nombre, apellido, correo, contrasena, rol, dni, estado });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
import repository from '../repositories/users.js'

const findAll = async (req, res) => {

    const result = await repository.findAll();

    return sendResults(result,res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);

    return sendResults(result,res);
}

const create = async (req, res) => {
    const payload = req.body;

    const result = await repository.create(payload);

    return sendResults(result,res)
}

const update = async (req, res) => {
    const payload = req.body;

    const result = await repository.update(payload);

    return sendResults(result,res)
}

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);

    return sendResults(result,res);
}

const sendResults = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: "Ha ocurrido un error!"})
}

const controller = { findAll, findOne, create, update, remove }

export default controller;