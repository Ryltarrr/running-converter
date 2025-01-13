export function getPercentOfMAS(mas: number | null, percent: number): number {
	if (mas === null) {
		return 0;
	}
	return mas * (percent / 100);
}
