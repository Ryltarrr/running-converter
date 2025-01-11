type StringObject = {
	[key: string]: string;
};

const KM_SUFFIX = ' km';

export function timeToDoDistance(
	speed: number | null,
	distance: number | null = null
): StringObject {
	if (speed === null || speed <= 0) {
		return {};
	}

	let times: StringObject = {
		'5': getFormattedTime(5 / speed),
		'10': getFormattedTime(10 / speed),
		halfMarathon: getFormattedTime(21.1 / speed),
		marathon: getFormattedTime(42.2 / speed)
	};

	if (distance !== null) {
		times[distance.toString() + KM_SUFFIX] = getFormattedTime(distance / speed);
	}

	return times;
}

export function translateDistanceName(distance: string): string {
	if (!isNaN(Number(distance))) {
		return distance + KM_SUFFIX;
	}

	switch (distance) {
		case 'halfMarathon':
			return 'Semi marathon';
		case 'marathon':
			return 'Marathon';
		default:
			return distance;
	}
}

function getFormattedTime(decimalHours: number): string {
	const hours = Math.floor(decimalHours);
	const hoursDecimal = decimalHours - hours;
	const minutes = Math.floor(hoursDecimal * 60);
	const minutesDecimal = hoursDecimal * 60 - minutes;
	const seconds = Math.round(minutesDecimal * 60);

	const adjustedSeconds = seconds === 60 ? 0 : seconds;
	const adjustedMinutes = seconds === 60 ? minutes + 1 : minutes;

	const finalMinutes = adjustedMinutes === 60 ? 0 : adjustedMinutes;
	const finalHours = adjustedMinutes === 60 ? hours + 1 : hours;

	const formattedHours = finalHours.toString().padStart(2, '0');
	const formattedMinutes = finalMinutes.toString().padStart(2, '0');
	const formattedSeconds = adjustedSeconds.toString().padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
