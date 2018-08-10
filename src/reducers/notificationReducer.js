import { INFO_NOTIFICATION } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case INFO_NOTIFICATION:
			return action.payload || false;
		default: 
			return state;
	}
}