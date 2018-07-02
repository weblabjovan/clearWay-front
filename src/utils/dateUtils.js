function trueDate() {
	const day = this.getDate(); //Date of the month: 2 in our example
	const month = this.getMonth() + 1; //Month of the Year: 0-based index, so 1 in our example
	const year = this.getFullYear();

	return day + '-' + month + '-' + year;
}

Date.prototype.trueDate = trueDate;