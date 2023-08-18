import { user } from '$lib/stores';

const cookie = document.cookie.split('; ').find(c => c.startsWith('keys='));

if (cookie) {
	const data = JSON.parse(decodeURIComponent(cookie.split(';')[0].split('=')[1]));
	user.set(data);
}
