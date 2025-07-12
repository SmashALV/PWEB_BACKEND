import app from './app.js';
import sequelize from './src/config/database.js';

async function main () {
    try {
        const init = process.argv[2];

        if (init) 
                await sequelize.sync({ force: true })
            else
                await sequelize.sync({ force: false})
            
        console.log('Base de datos actualizada!')

        app.listen(3001, () => {
        console.log('El servidor está ejecutándose en el puerto 3001')
})

    } catch (error) {
        console.log(error)
    }
}

main();


