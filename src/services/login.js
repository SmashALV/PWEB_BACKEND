import userRepository from '../repositories/users.js'

const login = async (payload) => {
    const usuarios = await userRepository.findAll()

    const result = usuarios.find(x => x.username === payload.username && 
                                    x.password === payload.password);
    
    if (result)
        return result;
    else 
        return null;
}

const userService = { login }

export default userService;