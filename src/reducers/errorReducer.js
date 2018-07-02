import { FETCH_ERROR } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case FETCH_ERROR:
			return action.payload || false;
		default: 
			return state;
	}
}