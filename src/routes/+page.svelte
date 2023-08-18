<script lang="ts">

	import { user } from '$lib/stores';

	let userValue;
	user.subscribe((value) => {
		userValue = value;
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{userValue.accessKey}
