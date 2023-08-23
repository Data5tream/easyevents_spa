import { loadEvent } from '$lib/api_service';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const event = loadEvent(params.id);

  return {
    event
  };
};
