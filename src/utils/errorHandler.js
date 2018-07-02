export default (error, page) => {
	if (!error || error === undefined) {
		return " "
	}

	if (error === 'Unauthorized') {
		if (page === 'Login') {
			return 'No users with provided data.'
		}
		if (page === 'Signup') {
			return 'User with this email already exist.'
		}
	}

	return error.error;
}