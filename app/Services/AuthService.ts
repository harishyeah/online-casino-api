// Models
import User from 'App/Models/User';
// Services
import ResponseService from "App/Services/ResponseService";

export default class AuthService {

	// Services Initialization
	private responseService: ResponseService = new ResponseService();

	async login(_data, auth) {

		const _user = await User.findBy('email', _data.email);

		try {
			if (_user == null) {
				return this.responseService.buildFailure(
					"Account does not exists."
				);
			}
		
			const token = await auth.attempt(_data.email, _data.password);

			let userDetails: any = {
				id: _user.id,
				name: _user.first_name + " " + _user.last_name,
				email: _user.email,
				credits: _user.credits,
				token: token.token
			};
		
			return this.responseService.buildSuccess("Logged in successfully", userDetails);
		} catch (_error) {
			console.log(_error.message)
			if (_error.name == "InvalidCredentialsException") {
				return this.responseService.buildFailure(
					"Invalid Credentials",
					null
				);
			} else {
				return this.responseService.buildFailure(
					"Something went wrong while logging in, please try again later."
				);
			}
		}
	}
}