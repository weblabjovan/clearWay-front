export default (user) => {
	let result = { ... user};
	if (user.car) {
		if (user.car.model) {
			result.model = user.car.model;
		}
		if (user.car.modelYear) {
			result.modelYear = user.car.modelYear;
		}
		if (user.car.modelNumber) {
			result.modelNumber = user.car.modelNumber;
		}
	}
	
	if (user.userType === 'false') {
		result.userType = false;
	}

	return result;
}