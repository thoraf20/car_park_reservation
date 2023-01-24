import express, { Router } from 'express'
import { loginHandler, registerHandler } from './src/controller/auth.controller'
import { createGarageHandler, getGarageHandler } from './src/controller/garage.controller'

const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)

router.post("/garage", createGarageHandler)
router.get("/garage", getGarageHandler)



export default router