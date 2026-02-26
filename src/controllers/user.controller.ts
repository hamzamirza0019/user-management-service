import type { Request, Response } from "express";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { UserRole, UserStatus } from "../models/user.types.js";

export const createUser = async ( req:Request, res: Response)=>{
    const {name, email} = req.body;
    if (!name || !email){
        throw new ApiError ({
            statusCode: 400,
            message: "Name and Email are required!"
        })
    }
    const existUser = await User.findOne({email});

    if(existUser){
        throw new ApiError({
            statusCode: 409,
            message: "User with this email already exist!"
        })
    }

    const user = await User.create({name, email});
    res.status(200).json({
        success: true,
        data: user 
    })
};

export const getUsers = async (req: Request, res:Response)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        data: users
    })
};


export const getUserById = async (req: Request, res:Response)=>{
    const { id } = req.params;

    const user = await User.findById(id);

    if(!user){
        throw new ApiError({
            statusCode: 404,
            message: "User Not Found!"
        })
    }

    res.status(200).json({
        success: true,
        data: user 
    })
}

export const updateUser = async (req: Request, res:Response)=>{
    const { id } = req.params
    const user = await User.findById(id);

    if(!user){
        throw new ApiError({
            statusCode: 404,
            message: "User Not Found!"
        })
    }

    Object.assign(user, req.body);
    await user.save();

    res.status(200).json({
        success: true,
        data: user 
    })
}


export const deleteUser = async (req: Request, res:Response)=>{
    const { id } = req.params
    const user = await User.findById(id);

    if(!user){
        throw new ApiError({
            statusCode: 404,
            message: "User Not Found!"
        })
    }

    user.status = UserStatus.INACTIVE;
    await user.save();

    res.status(200).json({
        success: true,
        message: " User deleted successfully..."
    })
}