import { getPaceFromSpeed, NO_PACE } from './pace';
import { test, describe, expect } from 'vitest';

describe('pace from speed', () => {
	test('returns 6:00 pace for 10 km/h', () => {
		expect(getPaceFromSpeed(10)).toEqual('6:00');
	});

	test('returns NO_PACE for 0 km/h', () => {
		expect(getPaceFromSpeed(0)).toEqual(NO_PACE);
	});

	test('returns 20:00 pace for 3 km/h', () => {
		expect(getPaceFromSpeed(3)).toEqual('20:00');
	});

	test('returns 3:36 pace for 16.67 km/h', () => {
		expect(getPaceFromSpeed(16.67)).toEqual('3:36');
	});

	test('returns NO_PACE for negative speed -3 km/h', () => {
		expect(getPaceFromSpeed(-3)).toEqual(NO_PACE);
	});

	test('returns NO_PACE for null speed', () => {
		expect(getPaceFromSpeed(null)).toEqual(NO_PACE);
	});
});
