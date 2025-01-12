import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	// const stateParam = url.searchParams.get('speed');
	// if (stateParam !== null && !isNaN(Number(stateParam))) {
	// 	return { speed: Number(stateParam) };
	// }

	return { speed: 16.67 };
};
