import { z } from 'zod'
import userModel from '../Models/userModel.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const userSchema  = z.object({
        username: z.string().min(2, {message: "username must be longer than 2 chars"}),
        email: z.string().email(),
        password: z.string().min(5, {message: "password must be larger than or equal to 5 chars "})
    })
    const validateSchema = userSchema.safeParse(req.body);
    if(!validateSchema.success) {
        return res.status(402).json({
            message: "Zod validation error"
        })
    }

    try {
        if(!username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required for signup"
            })
        }
        const user = await userModel.findOne({
            email : email
        })
    } catch (error) {
        
    }
}

export const login = async (req, res) => {
    
}

export const logout = async (req, res) => {
    
}