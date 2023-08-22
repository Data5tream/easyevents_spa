import { writable } from 'svelte/store';

export const user = writable({ accessKey: '', refreshKey: '' });

export const isMobile = writable(true);
