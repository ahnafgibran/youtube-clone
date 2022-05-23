import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import omit from '../../helpers/omit'
import { findUserByEmail } from '../user/user.service'
import { LoginBody } from './auth.schema'
import { signJwt } from './auth.utils'

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body


    // find the user by email
    const user = await findUserByEmail(email)

    if (!user || !(await user.comparePassword(password))) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid email or password"
        })
    }

    const payload = omit(user.toJSON(), ['password', '__v'])

    const jwt = signJwt(payload)

    // attach cookie to response
    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true, // won't be accessible by javascript
        domain: 'localhost', // set domain to localhost to make it work in development
        path: '/',
        sameSite: 'strict',
        secure: false, // set to true to make it work in production
    })

    return res.status(StatusCodes.OK).send(jwt)

    // verify user password

    // sign a jwt

    // add a cookie to the response

    // respond
}