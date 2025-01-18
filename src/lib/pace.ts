import { Speed } from './speed';
import type { Unit, ConversionDataUnit } from './unit';

export const possibleSeconds = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
	27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
	51, 52, 53, 54, 55, 56, 57, 58, 59
];

export class Pace implements Unit {
	static readonly NO_PACE = '0:00';
	static readonly UNIT = 'min/km';
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	static fromMinutesAndSeconds(minutes: number, seconds: number) {
		return new Pace(minutes + seconds / 60);
	}

	convertTo(outputUnit: ConversionDataUnit): Unit {
		switch (outputUnit) {
			case 'speed':
				return this.convertToSpeed();
			default:
				return this;
		}
	}

	getPercent(percent: number): Pace {
		if (percent <= 0) {
			return new Pace(0);
		}

		return new Pace(this.value * (percent / 100));
	}

	formatted() {
		if (this.value <= 0) {
			return `${Pace.NO_PACE} ${Pace.UNIT}`;
		}
		const { minutes, seconds } = this.asMinutesAndSeconds();
		return `${minutes}:${seconds.toString().padStart(2, '0')} ${Pace.UNIT}`;
	}

	asMinutesAndSeconds(): { minutes: number; seconds: number } {
		const minutes = Math.floor(this.value);
		const seconds = Math.round((this.value - minutes) * 60);
		return {
			minutes,
			seconds
		};
	}

	private convertToSpeed(): Speed {
		if (this.value === 0) {
			return new Speed(0);
		}

		return new Speed((1 * 60) / this.value);
	}
}
