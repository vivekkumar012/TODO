import { z } from 'zod'
import userModel from '../Models/userModel.js';
import bcrypt from 'bcrypt'
import { generateTokenAndSaveInCookies } from '../jwt/token.js';

export const register = async (req, res) => {
    const userSchema = z.object({
        username: z.string().min(2, { message: "Username must be longer than 2 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(5, { message: "Password must be at least 5 characters" }),
    });

    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: validation.error.errors, 
        });
    }

    const { username, email, password } = req.body;

    try {
        if(!username || !email || !password) {
            return res.status(402).json({
                message: "All fields are required for signup"
            })
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        if(newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            res.status(200).json({
                message: "signup successfully",
                newUser,
                token
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error during user signup",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(402).json({
                message: "All fields are required for login"
            })
        }
        const user = await userModel.findOne({
            email: email
        })
        if(!user) {
            return res.status(402).json({
                message: "User not found"
            })
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch) {
            return res.status(402).json({
                message: "Wrong password"
            })
        }
        const token = await generateTokenAndSaveInCookies(user._id, res);
        res.status(200).json({
            message: "user logged in successfully",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error during user signin",
            error: error.message,
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
           path: "/",
        });
    } catch (error) {
        res.status(400).json({
            message: "Error in user logout"
        })
    }
}