import { makeApiCall } from '$lib/auth_service';
import { user } from '$lib/stores';

interface BaseApiEvent {
  title: string;
  description: string;
  details_url: string;
  start_date: string;
  end_date: string;
  signup_start: string;
  signup_end: string;
  max_participants: number;
  require_confirmation: boolean;
}

export interface EventParticipant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ApiEvent extends BaseApiEvent {
  id: number;
  creator: string;
  template: string;
  participants: Array<EventParticipant>;
}

export interface EventUpdate {
  id: number;
  event: BaseApiEvent;
  event_type: string;
  timestamp: Date;
  user: EventParticipant;
}

export interface DashboardData {
  events: Array<BaseApiEvent>;
  updates: Array<EventUpdate>;
}

export const loadProfile = async () => {
  const res = await makeApiCall('api/profile', {});
  if (res.status === 200) {
    const data = await res.json();
    user.set(data);
  }
};

export const loadDashboard = async (): Promise<DashboardData | null> => {
  const res = await makeApiCall('api/dashboard', {});
  if (res.status === 200) {
    return (await res.json()) as DashboardData;
  }

  return null;
};

export const loadEvents = async (): Promise<Array<ApiEvent>> => {
  const res = await makeApiCall(`/api/events`, {});
  if (res.status === 200) {
    const data: Array<object> = await res.json();

    return data as Array<ApiEvent>;
  }

  return [];
};

export const loadEvent = async (id: string): Promise<ApiEvent | null> => {
  const res = await makeApiCall(`/api/event/${id}`, {});
  if (res.status === 200) {
    return (await res.json()) as ApiEvent;
  }

  return null;
};

export const createEvent = async (data: BaseApiEvent): Promise<number | null> => {
  const res = await makeApiCall('/api/event/new', {
    method: 'post',
    body: JSON.stringify(data)
  });
  if (res.status === 201) {
    return (await res.json()).id;
  }
  return null;
};

export const changePassword = async (old_password: string, new_password1: string, new_password2: string) => {
  const res = await makeApiCall('/api/account/change_password', {
    method: 'post',
    body: JSON.stringify({ old_password, new_password1, new_password2 })
  });
  if (res.status === 204) {
    return 'success';
  }

  return res.text();
};

export const updateAccountDetails = async (first_name: string, last_name: string) => {
  const res = await makeApiCall('/api/account/details', {
    method: 'post',
    body: JSON.stringify({ first_name, last_name })
  });
  return res.status === 204;
};

export const updateEventDetails = async (
  id: number,
  title: string,
  description: string,
  template: string,
  details_url = ''
) => {
  const res = await makeApiCall(`/api/event/${id}`, {
    method: 'put',
    body: JSON.stringify({ title, description, template, details_url })
  });

  return res.status === 200;
};
