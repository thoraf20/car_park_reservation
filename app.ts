import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import httpStatus from 'http-status-codes'
import cors from 'cors'
import "reflect-metadata"
import jwt from 'jsonwebtoken'
import { myDataSource } from './src/config/db.config'
import { requestLogger } from './src/middleware/requestLogger'
import v1Router from './urls'
import { checkJwt } from './src/middleware/authenticate'

dotenv.config()

const unless = (path: string[], middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (path.includes(req.path)) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestLogger)

// app.use(unless(['/v1/register', '/v1/login'], checkJwt))
app.use((req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
  const accessToken = authorization?.split(' ')[1] as string
  const decoded = jwt.decode(accessToken)

  res.locals.user = { _id: decoded?.sub }
  next()
})

app.use('/v1', v1Router)

// 404
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).send()
})

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

myDataSource
    .initialize()
    .then(() => {})
    .catch((err) => {
      // logger.error('Database connection error: ', err)
    })

app.listen(port, () => {
  console.info(`Server is up and running at port: ${port}.`)
})

export default app
