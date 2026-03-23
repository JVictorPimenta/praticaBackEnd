import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'seu_segredo_super_secreto';

// REGISTRAR ASSADAFJAKBGSD

export const register = async (req, res) => {

    try {

        const {email, password } = req.body;

        // verificando se já existe
        const userExists = await User.findOne({ where: email });

        if (userExists) {
            return res.status(400).json({ error: 'usuário já existe' })
        }

        // hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // salva no banco
        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(200).json({ message: 'usuário criado', user });
    } catch(err) {
        res.status(500).json({ error: 'erro no servidor, ' + err })
    }
};