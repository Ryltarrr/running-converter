export interface Unit {
	value: number;
	convertTo: (outputUnit: ConversionDataUnit) => Unit;
	formatted: () => string;
}

export type ConversionDataUnit = 'speed' | 'pace';
