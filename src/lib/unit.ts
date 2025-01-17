export interface Unit {
	value: number;
	convertTo: (outputUnit: ConversionDataUnit) => Unit;
	formatted: () => string;
	getPercent: (percent: number) => Unit;
}

export type ConversionDataUnit = 'speed' | 'pace';
