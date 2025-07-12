import Sequelize from 'sequelize'


// const hostname = 'localhost';
// const username = 'postgres';
// const password = '123';
// const database = 'postgres';
// const port = 5432;
// const dialect = 'postgres'


const hostname = 'prograweb-bd-jb-2025-1.postgres.database.azure.com';
const username = 'administrador';
const password = '7akqMhBnrJ3WpGH';
const database = 'postgres';
const port = 5432;
const dialect = 'postgres'

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false
})

export default sequelize;