export default (frequency) =>{
	switch(frequency){
		case 2:
			return 'Samo na dan';
		case 4:
			return 'Svakog radnog dana';
		case 5:
			return 'Svakog vikend dana';
		default:
			return 'Svakog dana';
	}
}