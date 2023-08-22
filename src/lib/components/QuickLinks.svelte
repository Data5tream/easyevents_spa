<script lang="ts">
	import { ClickableTile, Column, Grid, Row, Tile } from 'carbon-components-svelte';
	import { ArrowRight } from 'carbon-icons-svelte';
</script>

<div class="quick-links">
	<Grid noGutter>
		<Row>
			<Column md={4}>
				<ClickableTile class="link-card events" href='/events'>
					<h2>Events</h2>
					<p>Edit the events you have created.</p>
					<div class="arrow">
						<ArrowRight size={24} />
					</div>
				</ClickableTile>
			</Column>
			<Column md={4}>
				<Tile class="link-card participants">
					<h2>Participants</h2>
					<p>See a list of all participants you have gathered so far.</p>
				</Tile>
			</Column>
		</Row>
	</Grid>
</div>

<style>
	.quick-links {
		margin-bottom: 2rem;
	}

	.arrow {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}

	:global(.link-card) {
		position: relative;
		padding-right: 2rem;
		height: 12rem;
	}
	:global(.link-card.events) {
		background: rgb(45, 113, 182);
		background: linear-gradient(
			315deg,
			rgb(110, 49, 185) 0%,
			rgba(45, 113, 182, 1) 40%,
			rgba(45, 113, 182, 1) 100%
		);
	}
	:global(.link-card.participants) {
		background: rgb(182, 45, 171);
		background: linear-gradient(
			315deg,
			rgb(110, 49, 185) 0%,
			rgba(182, 45, 171, 1) 40%,
			rgba(182, 45, 171, 1) 100%
		);
	}
</style>
