import { loginHandler, registerHandler } from './src/controller/auth.controller'
import express, { Router } from 'express'

const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)


export default router