import { INFO_RESERVATION } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case INFO_RESERVATION:
			return action.payload || false;
		default: 
			return state;
	}
}