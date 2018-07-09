import axios from 'axios';
import LinkKey from './linkKeys';

export default async function() {
	if (localStorage.getItem('user')) {
		try{
			await axios.get(LinkKey('/api/user/isUserLogged'));
			return true;
		}catch(error){
			console.log(error);
			return false;
		}
	}else{
		return false;
	}
	
}
