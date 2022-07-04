'use strict'

// Packages & Libraries
import { schema } from '@ioc:Adonis/Core/Validator'

// Services
import ValidationService from 'App/Services/ValidationService'

import ResponseService from 'App/Services/ResponseService'
import UserService from 'App/Services/UserService'

export default class UserController {
  // Services Initialization
  private validationService: ValidationService = new ValidationService()
  private responseService: ResponseService = new ResponseService()
  private userService: UserService = new UserService()

  async getUserGames({ request, response }) {
    try {
      let _data = request.all()

      let _activityResponse = await this.userService.getUserGames(_data)

      return this.responseService.sendResponse(response, _activityResponse)
      
    } catch (error) {
      return this.responseService.sendResponse(
        response,
        this.responseService.buildFailure(
          'Something went wrong while fethicng data, please try again later.',
          error.message
        )
      )
    }
  }//end getUserGames function

  async insertGameDetails({ request, response }) {
    try {
      let _data = request.all()

      const validationSchema = schema.create({
        user_id: schema.number(),
        winning: schema.number(),
        reward: schema.number(),
        credits: schema.number(),
        fee: schema.number(),
        slot: schema.string(),
      })

      const validationMsg = {
        'user_id.required': 'User ID is required',
        'winning.required': 'Winning is required',
        'reward.required': 'Reward is required',
        'credits.required': 'Credits is required',
        'fee.required': 'Fee is required',
        'slot.required': 'Slot is required',
      }

      let validation = await this.validationService.validate(
        request,
        validationSchema,
        validationMsg
      )

      if (validation.status == 'failure') {
        return this.responseService.sendResponse(response, validation)
      }

      let _activityResponse = await this.userService.insertGameDetails(_data)

      return this.responseService.sendResponse(response, _activityResponse)
      
    } catch (error) {
      return this.responseService.sendResponse(
        response,
        this.responseService.buildFailure(
          'Something went wrong while fethicng data, please try again later.',
          error.message
        )
      )
    }
  }//end insertGameDetails function

}
