import type { Speed } from './speed';
type RaceTimes = {
	[key in 'marathon' | 'halfMarathon' | '10' | '5']: string;
};

type StringObject = {
	[key: string]: string;
};

const KM_SUFFIX = ' km';

export const DEFAULT_DISTANCES = {
	'5': 5,
	'10': 10,
	halfMarathon: 21.0975,
	marathon: 42.195
};

export function timeToDoDistance(
	speed: Speed | null,
	distance: number | null = null
): StringObject {
	if (speed === null || speed.value <= 0) {
		return {};
	}

	const times: RaceTimes = {
		'5': getFormattedTime(5 / speed.value),
		'10': getFormattedTime(10 / speed.value),
		halfMarathon: getFormattedTime(21.1 / speed.value),
		marathon: getFormattedTime(42.2 / speed.value)
	};

	if (distance !== null) {
		const customDistanceKey = distance.toString() + KM_SUFFIX;
		return { ...times, [customDistanceKey]: getFormattedTime(distance / speed.value) };
	} else {
		return times;
	}
}

function riegelFormula(knownDistance: number, knownTime: HoursAndMinutes, targetDistance: number) {
	const { hours, minutes } = knownTime;
	const decimalHours = hours + minutes / 60;
	return decimalHours * Math.pow(targetDistance / knownDistance, 1.06);
}

export function riegelTimes(
	knownDistance: number | null,
	knownTimeInput: string | null,
	targetDistance: number | null
): StringObject {
	const res: StringObject = {};
	if (knownDistance === null || knownTimeInput === null) {
		return {};
	}
	const knownTime = parseTimeInput(knownTimeInput);
	for (const [distanceName, distance] of Object.entries(DEFAULT_DISTANCES)) {
		res[translateDistanceName(distanceName)] = getFormattedTime(
			riegelFormula(knownDistance, knownTime, distance)
		);
	}

	if (targetDistance !== null && !Object.values(DEFAULT_DISTANCES).includes(targetDistance)) {
		res[translateDistanceName(targetDistance.toString())] = getFormattedTime(
			riegelFormula(knownDistance, knownTime, targetDistance)
		);
	}

	return res;
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

/**
 *  Format a decimal time into and hh:mm:ss string
 */
export function getFormattedTime(decimalHours: number): string {
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

type HoursAndMinutes = {
	hours: number;
	minutes: number;
};

/**
 * Parse an html time input value hh:mm into hours and minutes
 */
export function parseTimeInput(inputTime: string): HoursAndMinutes {
	const splitted = inputTime.split(':');
	const hours = Number(splitted?.[0]);
	const minutes = Number(splitted?.[1]);
	return { hours, minutes };
}
