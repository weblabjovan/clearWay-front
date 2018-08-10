export default (error, page) => {
	if (!error || error === undefined) {
		return " "
	}

	if (error === 'Unauthorized') {
		if (page === 'Login') {
			return 'Ne postoji korisnik sa unetim podacima.'
		}
		if (page === 'Signup') {
			return 'Korisnik sa unetim emailom već postoji.'
		}
		if (page === 'Rating') {
			return 'Nisu označene sve ocene.'
		}
	}

	return error.error;
}