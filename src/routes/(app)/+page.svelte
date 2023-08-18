<script lang="ts">

	import { user } from '$lib/stores';
	import { makeApiCall } from '$lib/auth_service';

	let userValue;
	user.subscribe((value) => {
		userValue = value;
	});

	let username = '';
	const test = async () => {
		const apiData = await (await makeApiCall('api/profile', {})).json();
		username = apiData.user;
	}

</script>

<h1>Dashboard</h1>
<p>Your username: {username}</p>

<button on:click={test}>Test</button>
