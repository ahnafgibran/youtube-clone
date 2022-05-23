import {Request, Response} from 'express'
import { StatusCodes } from "http-status-codes"
import { RegisterUserBody } from './user.schema'
import { createUser } from "./user.service"

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response){
    const {username, email, password} = req.body

    console.log(req.body)
    
  
    try {
        await createUser({username, email, password})

        return res.status(StatusCodes.CREATED).json({
            message: "User created successfully"
        })
    } catch(e){
        if (e.code === 11000){
            return res.status(StatusCodes.CONFLICT).json({
                message: "User already exists"
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to register user"
        })
    }
}