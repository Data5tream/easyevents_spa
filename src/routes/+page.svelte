<script lang="ts">

	import { user } from '$lib/stores';
	import { makeApiCall } from '$lib/auth_service';

	let userValue;
	user.subscribe((value) => {
		userValue = value;
	});


	const test = async () => {
		console.log(await makeApiCall('api/profile', {}));
	}

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{userValue.accessKey}

<button on:click={test}>Test</button>
