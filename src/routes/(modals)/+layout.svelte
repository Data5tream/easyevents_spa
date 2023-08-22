<script lang="ts">
	import { Content, Header, SkipToContent } from 'carbon-components-svelte';
</script>

<Header company="EasyEvents">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
</Header>

<Content>
	<slot />
</Content>
