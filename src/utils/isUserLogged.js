import axios from 'axios';

export default async function() {
	if (localStorage.getItem('user')) {
		try{
			await axios.get('/api/isUserLogged');
			return true;
		}catch(error){
			console.log(error);
			return false;
		}
	}else{
		return false;
	}
	
}
