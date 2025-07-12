class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    async findAll(options = {}) {
        try {
            return await this.model.findAll(options);
        } catch (error) {
            console.log("Error al encontrar todos los registros: ", error);
            return null;
        }
    }

    async create(entity) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            console.log("Error al crear el registro: ", error);
            return null;
        }
    }

    async findOne(id) {
        try {
            return await this.model.findOne(
                {
                    where: { id: id}
                }
            )
        } catch (error) {
            console.log("Error al encontrar el registro: ", error);
            return null;
        }
    }

    async update(entity) {
        try {
            const { id } = entity;
            return await this.model.update(entity, 
                {
                    where: { id: id}
                }
            )
        } catch (error) {
            console.log("Error al actualizar el registro: ", error);
            return null;
        }
    }

    async remove(id) {
        try {
            return await this.model.destroy(
                {
                    where: { id: id}
                }
            )
        } catch (error) {
            console.log("Error al eliminar el registro: ", error);
            return null;
        }
    }


}

export default RepositoryBase;