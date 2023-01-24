import express, { RequestHandler } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status-codes'
import { User } from '../entity/user'
import { AuthService } from '../services/auth/auth.service'
import { comparePassword, generateAccessToken, hashPassword } from '../helper'

export const registerHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const userExist = await User.findOne({
      where: { email: value.email }
    })

    if (userExist) {
      return res.status(httpStatus.CONFLICT).json({
        message: 'User account already exist'
      })
    }

    const registerUser = await AuthService.register({
      password: hashPassword(value.password),
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName
    })

    if (registerUser) {
      return res.status(httpStatus.CREATED).json({
        message: 'User created successfully',
      })
    } else {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Unable to create user',
      })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
}

export const loginHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const userExist = await User.findOne({
      where: { email: value.email }
    })

    if (!userExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'User account does not exist. Please register your account'
      })
    }

    const passwordMatch = comparePassword(value.password, userExist.password)

    if (!passwordMatch) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Invalid credentials'
      })
    }

    const token = generateAccessToken(userExist.id, userExist.email)

    return res.status(httpStatus.OK).json({
      message: 'Login successfully',
      data: { 
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        token 
      }
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
}