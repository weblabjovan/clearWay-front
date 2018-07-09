export default (mode) => {
	const loader = document.getElementById("loader");
	if (loader) {
		if (mode === 'on') {
			loader.style.display = 'block';
		}

		if (mode === 'off') {
			loader.style.display = 'none';
		}
	}
	
}