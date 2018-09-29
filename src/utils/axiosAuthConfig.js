
export default (config) => {
	const token = localStorage.getItem('user');

	  if ( token != null ) {
	    config.headers.Authorization = `${token}`;
	  }
	  return config;
}
