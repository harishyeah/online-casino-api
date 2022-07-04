/* eslint-disable */
// Services
import ResponseService from "App/Services/ResponseService"

export default class ValidationService {

	// Services Initialization
    private responseService : ResponseService = new ResponseService();
 
    async  validate(_request, _validationSchema, _validationMessages?){
        
        try {
            await _request.validate(
				{ 
					schema: _validationSchema,
					messages : _validationMessages
				}
			)
            
            return this.responseService.buildSuccess("Validation successful");
        } catch (error) {
            
            if(error.messages.errors != null && error.messages.errors.length > 0){
                if(error.messages.errors[0].message == null){
                    return this.responseService.buildFailure("Validation failed", error.message);
                }
                return this.responseService.buildFailure(error.messages.errors[0].message, error.messages.errors);
            }else{
                return this.responseService.buildFailure("Validation failed", error.message);
            }
        }
    }
}