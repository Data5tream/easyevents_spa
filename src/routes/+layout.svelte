<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import '$lib/style.css';
	import { isMobile } from '$lib/stores';
	import { checkMobile } from '$lib/util.js';

	let width: number;

	$: isMobile.set(checkMobile(width));
</script>

<svelte:window bind:innerWidth={width} />

<slot />
