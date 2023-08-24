import { loadEvent } from '$lib/api_service';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const event = await loadEvent(params.id);
  if (!event) {
    throw error(404, 'event not found');
  }

  return {
    event
  };
};
