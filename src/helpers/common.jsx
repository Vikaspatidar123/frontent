const Colors = {
	primaryBlue: '#2f06e9',
};

const colorOptions = [
	'bg-gradient',
	'bg-danger',
	'bg-warning',
	'bg-info',
	'bg-secondary',
	'bg-primary',
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

export { getRandomColor, Colors };
