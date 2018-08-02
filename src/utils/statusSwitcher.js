export default (status) => {
	switch(status){
		case 'sent':
			return 'NEODGOVORENO';
		case 'accepted':
			return 'PRIHVAĆENO';
		case 'declined':
			return 'ODBIJENO';
		default:
			return 'OTKAZANO';
	}
}