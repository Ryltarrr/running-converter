import { describe, test, expect } from 'vitest';
import {
	timeToDoDistance,
	translateDistanceName,
	parseTimeInput,
	riegelTimes,
	getFormattedTime,
	DEFAULT_DISTANCES
} from './distance';
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

describe('parseInputTime', () => {
	test('parse 01:34 correctly', () => {
		expect(parseTimeInput('01:34')).toStrictEqual({ hours: 1, minutes: 34 });
	});
	test('parse 00:00 correctly', () => {
		expect(parseTimeInput('00:00')).toStrictEqual({ hours: 0, minutes: 0 });
	});
	test('parse 01:34 correctly', () => {
		expect(parseTimeInput('0:4')).toStrictEqual({ hours: 0, minutes: 4 });
	});
	test('parse 01:34 correctly', () => {
		expect(parseTimeInput('10:')).toStrictEqual({ hours: 10, minutes: 0 });
	});
});

describe('riegelFormula', () => {
	test('marathon prediction from half marathon time', () => {
		const expected = {
			'5 km': '00:20:26',
			'10 km': '00:42:36',
			'Semi marathon': '01:34:00',
			Marathon: '03:15:59',
			'83 km': '06:41:29'
		};
		expect(riegelTimes(DEFAULT_DISTANCES['halfMarathon'], '01:34', 83)).toStrictEqual(expected);
	});

	test('10k prediction from 5k time', () => {
		const expected = {
			'5 km': '00:28:00',
			'10 km': '00:58:23',
			'Semi marathon': '02:08:48',
			Marathon: '04:28:33',
			'15 km': '01:29:43'
		};
		expect(riegelTimes(DEFAULT_DISTANCES['5'], '00:28', 15)).toStrictEqual(expected);
	});
});

describe('getFormattedTime', () => {
	describe('basic time formatting', () => {
		test('formats whole hours correctly', () => {
			expect(getFormattedTime(5)).toBe('05:00:00');
			expect(getFormattedTime(12)).toBe('12:00:00');
		});

		test('formats hours and minutes correctly', () => {
			expect(getFormattedTime(5.5)).toBe('05:30:00');
			expect(getFormattedTime(2.25)).toBe('02:15:00');
		});

		test('formats hours, minutes and seconds correctly', () => {
			expect(getFormattedTime(1.5125)).toBe('01:30:45');
			expect(getFormattedTime(2.0875)).toBe('02:05:15');
		});
	});

	describe('edge cases', () => {
		test('handles zero correctly', () => {
			expect(getFormattedTime(0)).toBe('00:00:00');
		});

		test('handles very small decimal values correctly', () => {
			expect(getFormattedTime(0.0001)).toBe('00:00:00');
			expect(getFormattedTime(0.0083)).toBe('00:00:30');
		});

		test('handles values just under whole hours correctly', () => {
			expect(getFormattedTime(1.9999)).toBe('02:00:00');
			expect(getFormattedTime(2.9972)).toBe('02:59:50');
		});
	});

	describe('rounding behavior', () => {
		test('rounds seconds to nearest minute when seconds = 60', () => {
			expect(getFormattedTime(1.0166667)).toBe('01:01:00'); // 1:00:60 should become 1:01:00
		});

		test('rounds up minutes when seconds round up to 60', () => {
			expect(getFormattedTime(1.99999)).toBe('02:00:00');
			expect(getFormattedTime(0.99999)).toBe('01:00:00');
		});

		test('handles minute rollovers correctly', () => {
			expect(getFormattedTime(1.9833333)).toBe('01:59:00');
		});
	});

	describe('padding behavior', () => {
		test('pads single digit hours with leading zero', () => {
			expect(getFormattedTime(5)).toBe('05:00:00');
			expect(getFormattedTime(9.5)).toBe('09:30:00');
		});

		test('pads single digit minutes with leading zero', () => {
			expect(getFormattedTime(1.1)).toBe('01:06:00');
			expect(getFormattedTime(2.05)).toBe('02:03:00');
		});

		test('pads single digit seconds with leading zero', () => {
			expect(getFormattedTime(1.0025)).toBe('01:00:09');
			expect(getFormattedTime(1.0014)).toBe('01:00:05');
		});
	});

	describe('special cases', () => {
		test('handles large hour values correctly', () => {
			expect(getFormattedTime(23.9999)).toBe('24:00:00');
			expect(getFormattedTime(99.5)).toBe('99:30:00');
		});

		test('handles precise decimal values correctly', () => {
			expect(getFormattedTime(1.5)).toBe('01:30:00');
			expect(getFormattedTime(1.25)).toBe('01:15:00');
			expect(getFormattedTime(1.75)).toBe('01:45:00');
		});

		test('handles floating point precision cases', () => {
			expect(getFormattedTime(1.1666666667)).toBe('01:10:00');
			expect(getFormattedTime(1.0833333333)).toBe('01:05:00');
		});
	});
});
