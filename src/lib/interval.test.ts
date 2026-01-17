import { formatSeconds, calculateInterval } from './interval';
import { test, expect, describe } from 'vitest';

describe('formatSeconds', () => {
	test('formats zero seconds', () => {
		expect(formatSeconds(0)).toBe('0:00');
	});

	test('formats negative seconds as zero', () => {
		expect(formatSeconds(-10)).toBe('0:00');
	});

	test('formats seconds under 1 minute', () => {
		expect(formatSeconds(45)).toBe('0:45');
	});

	test('formats exactly 1 minute', () => {
		expect(formatSeconds(60)).toBe('1:00');
	});

	test('formats minutes and seconds', () => {
		expect(formatSeconds(125)).toBe('2:05');
	});

	test('formats over 1 hour with HH:MM:SS', () => {
		expect(formatSeconds(3665)).toBe('1:01:05');
	});

	test('formats exactly 1 hour', () => {
		expect(formatSeconds(3600)).toBe('1:00:00');
	});

	test('formats multi-hour duration', () => {
		expect(formatSeconds(7325)).toBe('2:02:05');
	});
});

describe('calculateInterval', () => {
	test('calculates interval for valid inputs', () => {
		const result = calculateInterval({
			vmaSpeed: 15,
			intervalDistance: 400,
			repetitions: 10,
			vmaPercent: 100,
			restMinutes: 1,
			restSeconds: 30
		});

		expect(result.targetSpeed.value).toBe(15);
		expect(result.targetPace).toBe('4:00 min/km');
		expect(result.intervalTime).toBeCloseTo(96, 0); // 400m at 15km/h = 96s
		expect(result.totalWorkTime).toBeCloseTo(960, 0); // 10 x 96s
		expect(result.totalRestTime).toBe(810); // 9 x 90s
		expect(result.totalDistance).toBe(4000);
	});

	test('calculates interval at 90% VMA', () => {
		const result = calculateInterval({
			vmaSpeed: 20,
			intervalDistance: 1000,
			repetitions: 5,
			vmaPercent: 90,
			restMinutes: 2,
			restSeconds: 0
		});

		expect(result.targetSpeed.value).toBe(18); // 90% of 20
		expect(result.totalRestTime).toBe(480); // 4 x 120s
		expect(result.totalDistance).toBe(5000);
	});

	test('handles zero VMA', () => {
		const result = calculateInterval({
			vmaSpeed: 0,
			intervalDistance: 400,
			repetitions: 10,
			vmaPercent: 100,
			restMinutes: 1,
			restSeconds: 0
		});

		expect(result.targetSpeed.value).toBe(0);
		expect(result.intervalTime).toBe(0);
		expect(result.totalWorkTime).toBe(0);
		expect(result.totalRestTime).toBe(0);
		expect(result.totalDistance).toBe(0);
	});

	test('handles single repetition (zero rest)', () => {
		const result = calculateInterval({
			vmaSpeed: 15,
			intervalDistance: 400,
			repetitions: 1,
			vmaPercent: 100,
			restMinutes: 2,
			restSeconds: 0
		});

		expect(result.totalRestTime).toBe(0); // No rest with single rep
		expect(result.totalDistance).toBe(400);
	});

	test('handles zero rest duration', () => {
		const result = calculateInterval({
			vmaSpeed: 15,
			intervalDistance: 400,
			repetitions: 5,
			vmaPercent: 100,
			restMinutes: 0,
			restSeconds: 0
		});

		expect(result.totalRestTime).toBe(0);
		expect(result.totalWorkoutTime).toBe(result.totalWorkTime);
	});

	test('calculates total workout time correctly', () => {
		const result = calculateInterval({
			vmaSpeed: 12,
			intervalDistance: 200,
			repetitions: 8,
			vmaPercent: 110,
			restMinutes: 0,
			restSeconds: 45
		});

		// Total workout = work time + rest time
		expect(result.totalWorkoutTime).toBe(result.totalWorkTime + result.totalRestTime);
	});
});
