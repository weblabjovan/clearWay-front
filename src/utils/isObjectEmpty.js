

export default function(obj) {
	if (typeof obj === 'object') {
		for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }
	}else{
		if (obj.length > 0) {
			return false;
		}
	}

	return true;
}