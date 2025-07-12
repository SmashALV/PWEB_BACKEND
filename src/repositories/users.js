import model from '../models/user.js'
import RepositoryBase from './base.js'

const repository = new RepositoryBase(model);

repository.addUser = async (data) => {
    return await model.create(data);
};

export default repository;