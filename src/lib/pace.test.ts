import { test, describe, expect } from 'vitest';
import { Pace } from './pace';
import { Speed } from './speed';
import { parseTimeInput } from './distance';

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

	describe('getPercent', () => {
		test('get 50 percent of pace correctly', () => {
			expect(Pace.fromMinutesAndSeconds(4, 30).getPercent(50)).toStrictEqual(new Pace(2.25));
		});

		test('get 0 percent of pace correctly', () => {
			expect(Pace.fromMinutesAndSeconds(3, 17).getPercent(0)).toStrictEqual(new Pace(0));
		});

		test('get 120 percent of pace correctly', () => {
			expect(Pace.fromMinutesAndSeconds(4, 30).getPercent(120)).toStrictEqual(
				new Pace(5.3999999999999995)
			);
		});
	});

	describe('fromDistanceAndTime', () => {
		test('calculates pace correctly for a standard distance and time (hh:mm)', () => {
			const distanceInKilometers = 10; // 10 km
			const timeInput = '00:50'; // 50 minutes
			const parsedTime = parseTimeInput(timeInput);
			const totalTimeInMinutes = parsedTime.hours * 60 + parsedTime.minutes;
			const expectedPaceValue = totalTimeInMinutes / distanceInKilometers;
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)).toStrictEqual(
				new Pace(expectedPaceValue)
			);
		});

		test('calculates pace correctly for a shorter distance and time (hh:mm)', () => {
			const distanceInKilometers = 5; // 5 km
			const timeInput = '00:25'; // 25 minutes
			const parsedTime = parseTimeInput(timeInput);
			const totalTimeInMinutes = parsedTime.hours * 60 + parsedTime.minutes;
			const expectedPaceValue = totalTimeInMinutes / distanceInKilometers;
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)).toStrictEqual(
				new Pace(expectedPaceValue)
			);
		});

		test('calculates pace correctly for a longer distance and time with hours (hh:mm)', () => {
			const distanceInKilometers = 21.0975; // Half Marathon distance
			const timeInput = '01:30'; // 1 hour 30 minutes (90 minutes)
			const parsedTime = parseTimeInput(timeInput);
			const totalTimeInMinutes = parsedTime.hours * 60 + parsedTime.minutes;
			const expectedPaceValue = totalTimeInMinutes / distanceInKilometers;
			// Using toBeCloseTo for floating point comparison
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput).value).toBeCloseTo(
				expectedPaceValue
			);
		});

		test('handles zero time input "00:00" correctly', () => {
			const distanceInKilometers = 10; // 10 km
			const timeInput = '00:00'; // 0 minutes
			const parsedTime = parseTimeInput(timeInput);
			const totalTimeInMinutes = parsedTime.hours * 60 + parsedTime.minutes;
			const expectedPaceValue = totalTimeInMinutes / distanceInKilometers;
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)).toStrictEqual(
				new Pace(expectedPaceValue)
			);
		});

		test('handles null distance correctly', () => {
			const distanceInKilometers = null;
			const timeInput = '00:50';
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)).toStrictEqual(new Pace(0));
		});

		test('handles null time input correctly', () => {
			const distanceInKilometers = 10;
			const timeInput = null;
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)).toStrictEqual(new Pace(0));
		});

		test('handles null distance and null time input correctly', () => {
			const distanceInKilometers = null;
			const timeInput = null;
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)).toStrictEqual(new Pace(0));
		});

		test('handles zero distance correctly with valid time, resulting in Infinity pace', () => {
			const distanceInKilometers = 0; // 0 km
			const timeInput = '00:50'; // 50 minutes
			const parsedTime = parseTimeInput(timeInput);
			const totalTimeInMinutes = parsedTime.hours * 60 + parsedTime.minutes;
			const expectedPaceValue = totalTimeInMinutes / distanceInKilometers; // 50 / 0 results in Infinity
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)?.value).toBe(
				expectedPaceValue
			);
		});

		// Note: The behavior for 0 distance and "00:00" time input
		// will depend on how 0/0 is handled. JavaScript's result is NaN.
		test('handles zero distance and zero time input "00:00" correctly, resulting in NaN pace', () => {
			const distanceInKilometers = 0; // 0 km
			const timeInput = '00:00'; // 0 minutes
			expect(Pace.fromDistanceAndTime(distanceInKilometers, timeInput)?.value).toBeNaN();
		});
	});
});
