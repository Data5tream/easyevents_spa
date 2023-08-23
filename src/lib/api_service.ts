import { makeApiCall } from '$lib/auth_service';

export interface ApiEvent {
  id: number;
  creator: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  signup_start: string;
  signup_end: string;
  max_participants: number;
}

export const loadEvents = async (): Promise<Array<ApiEvent>> => {
  const res = await makeApiCall(`/api/events`, {});
  if (res.status === 200) {
    const data: Array<object> = await res.json();

    return data as Array<ApiEvent>;
  }

  return [];
};
