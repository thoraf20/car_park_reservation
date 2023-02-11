import express, { RequestHandler } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status-codes'
import { Garage } from '../entity/garage'
import { GarageService } from '../services/garage/garage.service'

export const addGarageHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    postalCode: Joi.string().required(),
    rateCompact: Joi.number().required(),
    rateReg: Joi.number().required(),
    rateLarge: Joi.number().required(),
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    // const garageExist = await Garage.findOne({
    //   where: { ...(req.query.postalCode ? { postalCode: req.query.postalCode as string } : {})}
    // })

    // if (garageExist) {
    //   return res.status(httpStatus.CONFLICT).json({
    //     meesage: `Garage already added for postal code ${value.postalCode}`
    //   })
    // }

    const newGarage = await GarageService.addGarage(value)

    if (newGarage) {
      return res.status(httpStatus.CREATED).json({
        message: 'Garage added successfully',
      })
    } else {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: `Unable to add garage for postal code ${value.postalCode}`,
      })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
}

export const getGarageHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    postalCode: Joi.string(),
  })

  const { value, error } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const garageExist = await Garage.find({
      where: { ...(req.query.postalCode ? { postalCode: req.query.postalCode as string } : {})}
    })

    if (!garageExist.length && req.query.postalCode) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'failed',
        meesage: `No garage exist for postal code ${req.query.postalCode}`,
        data: []
      })
    }

    if(!garageExist.length){
      return res.status(httpStatus.NOT_FOUND).json({
        meesage: `No garage added yet`
      })
    }

    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Garage fetch successfully',
      data: garageExist
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error
    })
  }
}
