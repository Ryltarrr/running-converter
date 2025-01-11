import { describe, test, expect } from 'vitest';
import { getPercentOfMAS } from './mas';

describe('getPercentOfMAS', () => {
	test('returns half of MAS when percent is 50', () => {
		expect(getPercentOfMAS(20, 50)).toBe(10);
	});

	test('returns full MAS when percent is 100', () => {
		expect(getPercentOfMAS(20, 100)).toBe(20);
	});

	test('returns zero when percent is 0', () => {
		expect(getPercentOfMAS(20, 0)).toBe(0);
	});

	test('handles decimal MAS values correctly', () => {
		expect(getPercentOfMAS(18.5, 75)).toBe(13.875);
	});

	test('returns zero when MAS is 0', () => {
		expect(getPercentOfMAS(0, 50)).toBe(0);
	});

	test('handles negative MAS values', () => {
		expect(getPercentOfMAS(-20, 50)).toBe(-10);
	});

	test('handles negative percentages', () => {
		expect(getPercentOfMAS(20, -50)).toBe(-10);
	});
});
