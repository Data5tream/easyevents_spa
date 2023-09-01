import { writable } from 'svelte/store';

export const keys = writable({ accessKey: '', refreshKey: '' });

export const user = writable({
  first_name: '',
  last_name: '',
  email: '',
});

export const isMobile = writable(true);

export const pageTitle = writable('');
