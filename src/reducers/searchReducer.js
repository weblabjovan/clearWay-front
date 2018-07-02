import { INFO_SEARCH } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case INFO_SEARCH:
			return action.payload || false;
		default: 
			return state;
	}
}
