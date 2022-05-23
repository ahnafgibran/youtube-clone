import express from 'express'
import { processRequestBody } from 'zod-express-middleware'
import { loginHandler } from './auth.controller'
import { loginSchema } from './auth.schema'

const router = express.Router()

// process request body is a middleware to validate request body based on a schema
router.post('/', processRequestBody(loginSchema.body), loginHandler)

export default router