const Colors = {
	primaryBlue: '#2f06e9',
};

const colorOptions = [
	'bg-secondary',
	'bg-primary',
	'bg-danger',
	'bg-warning',
	'bg-info',
	'bg-success',
];

let lastColor = null;

const getRandomColor = () => {
	let randomColor;

	do {
		const randomIndex = Math.floor(Math.random() * colorOptions.length);
		randomColor = colorOptions[randomIndex];
	} while (randomColor === lastColor);
	lastColor = randomColor;
	return randomColor;
};

const getSyncColor = (idx) => {
	const conertedIndex = idx % 10;
	const syncColor = colorOptions?.[conertedIndex]
		? colorOptions?.[conertedIndex]
		: colorOptions?.[conertedIndex - 5];
	return syncColor;
};

export { getRandomColor, Colors, getSyncColor };
