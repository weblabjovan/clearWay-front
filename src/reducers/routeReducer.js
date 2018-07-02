import { CREATE_ROUTE, SEARCH_ROUTE } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type){
		case CREATE_ROUTE:
			return action.payload || false;
		case SEARCH_ROUTE:
			return action.payload || false;
		default: 
			return state;
	}
}