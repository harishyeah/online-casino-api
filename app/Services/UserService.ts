// Models
import User from 'App/Models/User';
import UserGame from 'App/Models/UserGame';
// Services
import ResponseService from "App/Services/ResponseService";

export default class UserService {

	// Services Initialization
	private responseService: ResponseService = new ResponseService();

	async getUserGames(_data) {

		try {

            let _page = _data.page || 1;
		
			const _records = await UserGame.query()
                                            .where('user_id', _data.user_id)
                                            .orderBy('id', 'desc')
                                            .paginate(_page, 1000)
											
		
			return this.responseService.buildSuccess("data fetch successfully", _records);

		} catch (_error) {
			console.log(_error.message)
			return this.responseService.buildFailure(
                _error.message,
                null
            );
		}
	}

	async insertGameDetails(_data) {
		
		try {
			let _remainingCredits = _data.credits +_data.reward - _data.fee;
			let insert = {
				user_id: _data.user_id,
				winning: _data.winning,
				reward: _data.reward,
				remaining_credits: _remainingCredits,
				slot: _data.slot,
			}

			await UserGame.create(insert);
			
			// update the credits to users tabel

			let _user:any = await User.find(_data.user_id);

			_user.credits = _remainingCredits;

			await _user.save();

			let userDetails: any = {
				id: _user.id,
				name: _user.first_name + " " + _user.last_name,
				email: _user.email,
				credits: _user.credits
			};
			
		
			return this.responseService.buildSuccess(" Credit deduction successfully", userDetails);

		} catch (_error) {
			console.log(_error.message)
			return this.responseService.buildFailure(
                _error.message,
                null
            );
		}
	}
}