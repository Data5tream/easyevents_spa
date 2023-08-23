import { makeApiCall } from '$lib/auth_service';

interface BaseApiEvent {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  signup_start: string;
  signup_end: string;
  max_participants: number;
  require_confirmation: boolean;
}

export interface ApiEvent extends BaseApiEvent {
  id: number;
  creator: string;
}

export const loadEvents = async (): Promise<Array<ApiEvent>> => {
  const res = await makeApiCall(`/api/events`, {});
  if (res.status === 200) {
    const data: Array<object> = await res.json();

    return data as Array<ApiEvent>;
  }

  return [];
};
