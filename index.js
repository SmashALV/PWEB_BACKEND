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

        const PORT = process.env.PORT || 3001;

        app.listen(PORT, () => {
        console.log('El servidor está ejecutándose en el puerto ${PORT}')
})

    } catch (error) {
        console.log(error)
    }
}

main();


