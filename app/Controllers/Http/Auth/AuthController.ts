'use strict'

// Packages & Libraries
import { schema, rules } from '@ioc:Adonis/Core/Validator'

// Services
import ValidationService from 'App/Services/ValidationService'
import ResponseService from 'App/Services/ResponseService'
import AuthService from 'App/Services/AuthService'

export default class AuthController {
  // Services Initialization
  private validationService: ValidationService = new ValidationService()
  private responseService: ResponseService = new ResponseService()
  private authService: AuthService = new AuthService()

  async login({ request, response, auth }) {
    try {
      let _data = request.all()

      const validationSchema = schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      })

      const validationMsg = {
        'email.required': 'Email is required',
        'email.email': 'Please enter a valid email',
        'password.required': 'Password is required',
      }

      let validation = await this.validationService.validate(
        request,
        validationSchema,
        validationMsg
      )

      if (validation.status == 'failure') {
        return this.responseService.sendResponse(response, validation)
      }

      let _activityResponse = await this.authService.login(_data, auth)
      return this.responseService.sendResponse(response, _activityResponse)
      
    } catch (error) {
      return this.responseService.sendResponse(
        response,
        this.responseService.buildFailure(
          'Something went wrong while logging in, please try again later.',
          error.message
        )
      )
    }
  }//end login function

}
