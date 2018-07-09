
export default (suffix) => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	   return 'http://localhost:5000' + suffix;
	} else {
	   return 'https://whispering-island-29767.herokuapp.com' + suffix;
	}
}