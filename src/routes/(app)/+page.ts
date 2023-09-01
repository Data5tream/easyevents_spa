import { loadDashboard } from '$lib/api_service';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async () => {
  const data = await loadDashboard();
  if (!data) {
    throw error(500, 'something went wrong');
  }

  return {
    data,
  };
};
