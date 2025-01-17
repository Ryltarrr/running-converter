import { test, describe, expect } from 'vitest';
import { Pace } from './pace';
import { Speed } from './speed';

describe('Pace Class', () => {
	describe('fromMinutesAndSeconds', () => {
		test('converts 4 minutes and 30 seconds correctly', () => {
			expect(Pace.fromMinutesAndSeconds(4, 30)).toStrictEqual(new Pace(4.5));
		});

		test('converts 3 minutes and 17 seconds correctly', () => {
			expect(Pace.fromMinutesAndSeconds(3, 17)).toStrictEqual(new Pace(3.283333333333333));
		});
	});

	describe('formatting', () => {
		test('formats whole number pace correctly', () => {
			const pace = new Pace(4);
			expect(pace.formatted()).toStrictEqual('4:00 min/km');
		});

		test('formats decimal pace correctly', () => {
			const pace = new Pace(3.33);
			expect(pace.formatted()).toStrictEqual('3:20 min/km');
		});

		test('formats zero pace as NO_PACE', () => {
			const pace = new Pace(0);
			expect(pace.formatted()).toStrictEqual(Pace.NO_PACE + ' min/km');
		});

		test('formats negative pace as NO_PACE', () => {
			const pace = new Pace(-5.1);
			expect(pace.formatted()).toStrictEqual(Pace.NO_PACE + ' min/km');
		});
	});

	describe('conversion to speed', () => {
		describe('speed values', () => {
			test('converts zero pace to zero speed', () => {
				const pace = new Pace(0);
				expect(pace.convertTo('speed')).toStrictEqual(new Speed(0));
			});

			test('converts 4 min/km pace to 15 km/h', () => {
				const pace = new Pace(4);
				expect(pace.convertTo('speed')).toStrictEqual(new Speed(15));
			});

			test('converts 6:00 min/km to 10 km/h', () => {
				const pace = Pace.fromMinutesAndSeconds(6, 0);
				expect(pace.convertTo('speed')).toStrictEqual(new Speed(10));
			});

			test('converts 3:33 min/km to 16.9 km/h', () => {
				const pace = Pace.fromMinutesAndSeconds(3, 33);
				expect(pace.convertTo('speed')).toStrictEqual(new Speed(16.901408450704228));
			});

			test('handles negative pace values', () => {
				const pace = Pace.fromMinutesAndSeconds(-3, -3);
				expect(pace.convertTo('speed')).toStrictEqual(new Speed(-19.672131147540984));
			});
		});

		describe('formatted speed output', () => {
			test('formats 6:00 min/km pace as "10.0 km/h"', () => {
				const pace = Pace.fromMinutesAndSeconds(6, 0);
				expect(pace.convertTo('speed').formatted()).toEqual('10.0 km/h');
			});

			test('formats 0:00 min/km pace as "0.0 km/h"', () => {
				const pace = Pace.fromMinutesAndSeconds(0, 0);
				expect(pace.convertTo('speed').formatted()).toEqual('0.0 km/h');
			});

			test('formats 3:33 min/km pace as "16.9 km/h"', () => {
				const pace = Pace.fromMinutesAndSeconds(3, 33);
				expect(pace.convertTo('speed').formatted()).toEqual('16.9 km/h');
			});

			test('formats negative pace as "-19.7 km/h"', () => {
				const pace = Pace.fromMinutesAndSeconds(-3, -3);
				expect(pace.convertTo('speed').formatted()).toEqual('-19.7 km/h');
			});
		});
	});
});
