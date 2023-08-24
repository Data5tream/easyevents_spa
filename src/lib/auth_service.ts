import { PUBLIC_API_HOST } from '$env/static/public';
import { keys } from '$lib/stores';
import { goto } from '$app/navigation';

export const login = async (username: string, password: string): Promise<{ status: number; detail?: string }> => {
  const form = new FormData();
  form.set('username', username);
  form.set('password', password);

  const res = await fetch(`${PUBLIC_API_HOST}/api/token`, {
    method: 'POST',
    body: form
  });

  const status = res.status;

  if (status === 200) {
    const data = await res.json();

    const dataEle = {
      accessKey: data.access,
      refreshKey: data.refresh
    };

    keys.set(dataEle);
    document.cookie = `keys=${encodeURIComponent(JSON.stringify(dataEle))};path='/';SameSite=Strict;Secure`;

    return { status };
  }

  const detail = (await res.json()).detail;

  return { status, detail };
};

export const logout = () => {
  keys.set({ accessKey: '', refreshKey: '' });
  document.cookie = 'keys=a;path="/";expires=Thu, 01 Jan 1970 00:00:01 GMT';
};

export const refreshAccessToken = async (refresh: string) => {
  const res = await fetch(`${PUBLIC_API_HOST}/api/token/refresh`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ refresh })
  });

  if (res.status === 200) {
    keys.set({ accessKey: (await res.json()).access, refreshKey: refresh });
    return true;
  }

  return false;
};

export const makeApiCall = async (url: string, config: RequestInit): Promise<Response> => {
  let keysVal = {
    accessKey: '',
    refreshKey: ''
  };

  keys.subscribe((value) => {
    keysVal = value;
  })();

  if (!keysVal.accessKey) {
    await goto('/login');
  }

  const init = {
    ...config,
    headers: new Headers({
      Authorization: `Bearer ${keysVal.accessKey}`,
      'Content-Type': 'application/json'
    })
  };

  const res = await fetch(`${PUBLIC_API_HOST}/${url}`, init);
  if (res.status === 401) {
    if (await refreshAccessToken(keysVal.refreshKey)) {
      return makeApiCall(url, config);
    } else {
      await goto('/login');
    }
  }

  return res;
};
