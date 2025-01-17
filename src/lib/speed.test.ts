import { Pace } from './pace';
import { Speed } from './speed';
import { test, expect, describe } from 'vitest';

describe('Speed Class', () => {
	describe('formatting', () => {
		test('formats decimal speed with one decimal place', () => {
			const speed = new Speed(12.6667);
			expect(speed.formatted()).toStrictEqual('12.7 km/h');
		});

		test('formats zero speed correctly', () => {
			const speed = new Speed(0);
			expect(speed.formatted()).toStrictEqual('0.0 km/h');
		});
	});

	describe('conversion to pace', () => {
		test('converts 10 km/h to 6:00 min/km pace', () => {
			const speed = new Speed(10);
			expect(speed.convertTo('pace').formatted()).toStrictEqual('6:00 min/km');
		});

		test('converts 12 km/h to 5:00 min/km pace', () => {
			const speed = new Speed(12);
			const expected = new Pace(5);
			expect(speed.convertTo('pace')).toStrictEqual(expected);
			expect(speed.convertTo('pace')).toBeInstanceOf(Pace);
		});

		test('converts zero speed to zero pace', () => {
			const speed = new Speed(0);
			const expected = new Pace(0);
			expect(speed.convertTo('pace')).toStrictEqual(expected);
			expect(speed.convertTo('pace')).toBeInstanceOf(Pace);
		});

		test('converts 3 km/h to 20:00 min/km pace', () => {
			const speed = new Speed(3);
			expect(speed.convertTo('pace').formatted()).toStrictEqual('20:00 min/km');
		});

		test('converts 16.67 km/h to 3:36 min/km pace', () => {
			const speed = new Speed(16.67);
			expect(speed.convertTo('pace').formatted()).toStrictEqual('3:36 min/km');
		});

		test('handles negative speed values', () => {
			const speed = new Speed(-3);
			expect(speed.convertTo('pace').formatted()).toStrictEqual('0:00 min/km');
		});
	});
});
