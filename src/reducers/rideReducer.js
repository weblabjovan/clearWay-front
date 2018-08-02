import { INFO_RIDE } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case INFO_RIDE:
			return action.payload || false;
		default: 
			return state;
	}
}