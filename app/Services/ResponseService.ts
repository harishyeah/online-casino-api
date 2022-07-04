/* eslint-disable */
export default class ResponseService {
  buildSuccess(_message: string, _data?: any) {
    return {
      status: 'success',
      data: _data,
      message: _message,
    }
  }

  buildFailure(_message: any, _data?: any) {
    return {
      status: 'failure',
      data: _data,
      message: _message,
    }
  }

  sendResponse(_response, _responseData) {
    let _overrideHttpCode = 500

    if (_responseData.status == 'success') {
      _overrideHttpCode = 200
    } else {
      _overrideHttpCode = 500
      }

    return _response.status(_overrideHttpCode).json(_responseData)
  }

  buildValidationMessage(_arrMessage) {
    let _msg = 'Something went wrong please try again.'

    if (_arrMessage[0] != undefined) {
      _msg = _arrMessage[0].message
    } else if (typeof _arrMessage === 'string') {
      return _arrMessage
    }

    return _msg
  }
}
