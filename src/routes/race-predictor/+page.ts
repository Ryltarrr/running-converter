import { loadStateHelper } from '$lib/storage';
import type { PageLoad } from '../time-to-do-distance/$types';

export const load: PageLoad = () => {
	return loadStateHelper();
};
