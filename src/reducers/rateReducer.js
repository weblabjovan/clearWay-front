import { INFO_RATE } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case INFO_RATE:
			return action.payload || false;
		default: 
			return state;
	}
}