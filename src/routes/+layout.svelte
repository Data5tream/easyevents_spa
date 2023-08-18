<script lang="ts">
	import "carbon-components-svelte/css/g90.css";
import {
	Content,
	Header,
	SkipToContent
} from 'carbon-components-svelte';
	export const ssr = false;
</script>

<Header company='EasyEvents'>
	<svelte:fragment slot='skip-to-content'>
		<SkipToContent />
	</svelte:fragment>
</Header>

<Content>
	<slot />
</Content>
