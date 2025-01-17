import { Pace } from './pace';
import type { ConversionDataUnit, Unit } from './unit';

export class Speed implements Unit {
	static readonly UNIT = 'km/h';
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	formatted(): string {
		return this.value.toFixed(1) + ' ' + Speed.UNIT;
	}

	convertTo(outputUnit: ConversionDataUnit): Unit {
		switch (outputUnit) {
			case 'pace':
				return this.convertToPace(this.value);
			default:
				return this;
		}
	}

	private convertToPace(input: number): Pace {
		if (input === 0) {
			return new Pace(0);
		}

		return new Pace(60 / input);
	}
}
