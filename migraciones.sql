-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);


-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoriaId INTEGER NOT NULL REFERENCES categorias(id),
    precio NUMERIC(10,2) NOT NULL,
    precioConDescuento NUMERIC(10,2),
    descripcion TEXT,
    img VARCHAR(255),
    stock INTEGER NOT NULL
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    correo VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255),
    rol VARCHAR(50),
    dni VARCHAR(20),
    estado VARCHAR(20),
    fechaCreacion DATE
);

-- Índices sugeridos
CREATE INDEX IF NOT EXISTS idx_categoria_nombre ON categorias(nombre);
CREATE INDEX IF NOT EXISTS idx_productos_categoriaId ON productos(categoriaId);
CREATE INDEX IF NOT EXISTS idx_users_correo ON users(correo);
