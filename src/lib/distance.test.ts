import { describe, test, expect } from 'vitest';
import { RunDuration, timeToDoDistance, translateDistanceName } from './distance';
import { Speed } from './speed';

describe('timeToDoDistance', () => {
	test('calculates times for standard distances at 10 km/h', () => {
		const result = timeToDoDistance(new Speed(10));
		expect(result).toEqual({
			'5': '00:30:00',
			'10': '01:00:00',
			halfMarathon: '02:06:36',
			marathon: '04:13:12'
		});
	});

	test('calculates times for standard distances at 12 km/h', () => {
		const result = timeToDoDistance(new Speed(12));
		expect(result).toEqual({
			'5': '00:25:00',
			'10': '00:50:00',
			halfMarathon: '01:45:30',
			marathon: '03:31:00'
		});
	});

	test('includes custom distance when provided', () => {
		const result = timeToDoDistance(new Speed(10), 15);
		expect(result['15 km']).toBe('01:30:00');
	});

	test('returns empty object for null speed', () => {
		expect(timeToDoDistance(null)).toEqual({});
	});

	test('returns empty object for zero speed', () => {
		expect(timeToDoDistance(new Speed(0))).toEqual({});
	});

	test('returns empty object for negative speed', () => {
		expect(timeToDoDistance(new Speed(-5))).toEqual({});
	});

	test('handles decimal speeds correctly', () => {
		const result = timeToDoDistance(new Speed(8.5));
		expect(result['10']).toBe('01:10:35');
	});
});

describe('translateDistanceName', () => {
	test('translates numeric distances to km format', () => {
		expect(translateDistanceName('5')).toBe('5 km');
		expect(translateDistanceName('10')).toBe('10 km');
		expect(translateDistanceName('42')).toBe('42 km');
	});

	test('translates halfMarathon to Semi marathon', () => {
		expect(translateDistanceName('halfMarathon')).toBe('Semi marathon');
	});

	test('translates marathon to Marathon', () => {
		expect(translateDistanceName('marathon')).toBe('Marathon');
	});

	test('returns original string for unknown distance names', () => {
		expect(translateDistanceName('unknown')).toBe('unknown');
	});
});

describe('getFormattedTime (through timeToDoDistance)', () => {
	test('handles hour rollover when seconds round to 60', () => {
		// Using a speed that will generate times that test rollover
		const result = timeToDoDistance(new Speed(0.99999));
		expect(result['5']).toBe('05:00:00'); // Not '04:59:60'
	});

	test('pads single digits with zeros', () => {
		const result = timeToDoDistance(new Speed(30));
		expect(result['5']).toBe('00:10:00');
	});

	test('handles very long durations', () => {
		const result = timeToDoDistance(new Speed(1));
		expect(result['marathon']).toBe('42:12:00');
	});

	test('handles very short durations', () => {
		const result = timeToDoDistance(new Speed(100));
		expect(result['5']).toBe('00:03:00');
	});
});
