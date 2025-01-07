export function getSpeedFromPace(paceMinutes: number, paceSeconds: number): string {
	if (paceMinutes + paceSeconds === 0) {
		return '--';
	}
	return ((1 * 60) / (paceMinutes + paceSeconds / 60)).toFixed(1).toLocaleLowerCase();
}

export function getPaceFromSpeed(speed: number | null | undefined): string {
	if (typeof speed !== 'number' || speed === 0) {
		return '-:-';
	}
	const parsedSpeed = 60 / speed;
	const integer = Math.floor(parsedSpeed);
	const decimal = Math.round((parsedSpeed - integer) * 60);
	let formattedDecimal = decimal.toString().padStart(2, '0');
	return `${integer}:${formattedDecimal}`;
}

export function getPercentOfVMA(vma: number, percent: number): number {
	return vma * (percent / 100);
}
