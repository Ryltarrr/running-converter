export type AppState = {
	speed: number;
};
export function saveState(state: AppState) {
	if (typeof window !== 'undefined') {
		localStorage.setItem('appState', JSON.stringify(state));
	}
}

function loadState() {
	if (typeof window !== 'undefined') {
		const rawAppState = localStorage.getItem('appState');
		if (rawAppState) {
			return JSON.parse(rawAppState) as AppState;
		}
	}
	return null;
}

export function loadStateHelper() {
	const appState = loadState();
	if (appState) {
		return { speed: appState.speed };
	}

	return { speed: null };
}
