export function getSpeedFromPace(paceMinutes: number | null, paceSeconds: number | null): number {
	paceMinutes = paceMinutes ?? 0;
	paceSeconds = paceSeconds ?? 0;

	if (paceMinutes + paceSeconds <= 0) {
		return 0;
	}
	return (1 * 60) / (paceMinutes + paceSeconds / 60);
}

export function getFormattedSpeedFromPace(
	paceMinutes: number | null,
	paceSeconds: number | null
): string {
	return getSpeedFromPace(paceMinutes, paceSeconds).toFixed(1).toLocaleLowerCase();
}
