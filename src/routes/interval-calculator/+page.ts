import { loadStateHelper } from '$lib/storage';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return loadStateHelper();
};
