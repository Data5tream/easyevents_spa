import { PUBLIC_API_HOST } from '$env/static/public';
import { user } from '$lib/stores';

export const login = async (username: string, password: string): Promise<{ status: number, detail?: string}> => {
	const form = new FormData();
	form.set('username', username);
	form.set('password', password);

	const res = await fetch(`${PUBLIC_API_HOST}/api/token`, {
		method: 'POST',
		body: form,
	});

	const status = res.status;

	if (status === 200) {
		const data = await res.json();

		const dataEle = {
			accessKey: data.access,
			refreshKey: data.refresh
		};

		user.set(dataEle);
		document.cookie = `keys=${encodeURIComponent(JSON.stringify(dataEle))};path='/';SameSite=Strict;Secure`

		return { status }
	}

	const detail = (await res.json()).detail;

 	return { status, detail };
}
