<script lang="ts">
	import { Tile } from 'carbon-components-svelte';

	const stats = [
		{
			title: 'Events',
			count: 10
		},
		{
			title: 'Participants',
			count: 910
		}
	];
</script>

<Tile>
	<h2>Quick Stats</h2>
	<div class="stats-container">
		{#each stats as stat}
			<div class="info">
				<span>{stat.count}</span>
				<span>{stat.title}</span>
			</div>
		{/each}
	</div>
</Tile>

<style>
	.stats-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.info > span:first-child {
		font-size: 5rem;
	}
</style>
