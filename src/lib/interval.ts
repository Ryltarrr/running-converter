import { Speed } from './speed';

export interface IntervalInput {
	vmaSpeed: number;
	intervalDistance: number;
	repetitions: number;
	vmaPercent: number;
	restMinutes: number;
	restSeconds: number;
}

export interface IntervalResult {
	targetSpeed: Speed;
	targetPace: string;
	intervalTime: number;
	totalWorkTime: number;
	totalRestTime: number;
	totalWorkoutTime: number;
	totalDistance: number;
}

export function formatSeconds(totalSeconds: number): string {
	if (totalSeconds <= 0) {
		return '0:00';
	}

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.round(totalSeconds % 60);

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateInterval(input: IntervalInput): IntervalResult {
	const { vmaSpeed, intervalDistance, repetitions, vmaPercent, restMinutes, restSeconds } = input;

	if (vmaSpeed <= 0) {
		return {
			targetSpeed: new Speed(0),
			targetPace: '0:00 min/km',
			intervalTime: 0,
			totalWorkTime: 0,
			totalRestTime: 0,
			totalWorkoutTime: 0,
			totalDistance: 0
		};
	}

	const speed = new Speed(vmaSpeed);
	const targetSpeed = speed.getPercent(vmaPercent);
	const targetPace = targetSpeed.convertTo('pace').formatted();

	// intervalTime in seconds: (distance in km) / (speed in km/h) * 3600
	const intervalTimeSeconds = (intervalDistance / 1000 / targetSpeed.value) * 3600;

	const totalWorkSeconds = intervalTimeSeconds * repetitions;

	// Rest is between intervals, so (repetitions - 1) rest periods
	const restPerInterval = restMinutes * 60 + restSeconds;
	const totalRestSeconds = restPerInterval * Math.max(0, repetitions - 1);

	const totalWorkoutSeconds = totalWorkSeconds + totalRestSeconds;

	const totalDistance = intervalDistance * repetitions;

	return {
		targetSpeed,
		targetPace,
		intervalTime: intervalTimeSeconds,
		totalWorkTime: totalWorkSeconds,
		totalRestTime: totalRestSeconds,
		totalWorkoutTime: totalWorkoutSeconds,
		totalDistance
	};
}
