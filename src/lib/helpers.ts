type StringObject = {
	[key: string]: string;
};

export const possibleSeconds = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
	27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
	51, 52, 53, 54, 55, 56, 57, 58, 59
];

const KM_SUFFIX = ' km';

// TODO: cleanup into classes
export function getSpeedFromPace(paceMinutes: number, paceSeconds: number): number {
	if (paceMinutes + paceSeconds === 0) {
		return 0;
	}
	return (1 * 60) / (paceMinutes + paceSeconds / 60);
}

export function getFormattedSpeedFromPace(paceMinutes: number, paceSeconds: number): string {
	if (paceMinutes + paceSeconds === 0) {
		return '--';
	}
	return ((1 * 60) / (paceMinutes + paceSeconds / 60)).toFixed(1).toLocaleLowerCase();
}

export function getPaceFromSpeed(speed: number | null | undefined): string {
	if (typeof speed !== 'number' || speed === 0) {
		return '-:-';
	}
	const parsedSpeed = 60 / speed;
	const integer = Math.floor(parsedSpeed);
	const decimal = Math.round((parsedSpeed - integer) * 60);
	let formattedDecimal = decimal.toString().padStart(2, '0');
	return `${integer}:${formattedDecimal}`;
}

export function getPercentOfVMA(vma: number, percent: number): number {
	return vma * (percent / 100);
}

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
