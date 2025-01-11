import { getSpeedFromPace, getFormattedSpeedFromPace } from './speed';
import { test, expect, describe } from 'vitest';

describe('speed calculations', () => {
	describe('speed from pace', () => {
		test('returns 10 km/h for pace of 6:00 min/km', () => {
			expect(getSpeedFromPace(6, 0)).toEqual(10);
		});

		test('returns 0 km/h for pace of 0:00 min/km', () => {
			expect(getSpeedFromPace(0, 0)).toEqual(0);
		});

		test('returns 16.9 km/h for pace of 3:33 min/km', () => {
			expect(getSpeedFromPace(3, 33)).toEqual(16.901408450704228);
		});

		test('returns 0 km/h for negative pace values', () => {
			expect(getSpeedFromPace(-3, -3)).toEqual(0);
		});

		test('returns 0 km/h for null pace values', () => {
			expect(getSpeedFromPace(null, null)).toEqual(0);
		});
	});

	describe('formatted speed from pace', () => {
		test('returns "10.0" km/h for pace of 6:00 min/km', () => {
			expect(getFormattedSpeedFromPace(6, 0)).toEqual('10.0');
		});

		test('returns "0.0" km/h for pace of 0:00 min/km', () => {
			expect(getFormattedSpeedFromPace(0, 0)).toEqual('0.0');
		});

		test('returns "16.9" km/h for pace of 3:33 min/km', () => {
			expect(getFormattedSpeedFromPace(3, 33)).toEqual('16.9');
		});

		test('returns "0.0" km/h for negative pace values', () => {
			expect(getFormattedSpeedFromPace(-3, -3)).toEqual('0.0');
		});

		test('returns "0.0" km/h for null pace values', () => {
			expect(getFormattedSpeedFromPace(null, null)).toEqual('0.0');
		});
	});
});
