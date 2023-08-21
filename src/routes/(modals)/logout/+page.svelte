<script lang="ts">
	import { onMount } from 'svelte';
	import { logout } from '$lib/auth_service';
	import { Button, Column, Grid, Row, Tile } from 'carbon-components-svelte';

	onMount(() => {
		logout();
	});
</script>

<Grid>
	<Row>
		<Column md={{ span: 4, offset: 2 }}>
			<div class="logged-card">
				<Tile>
					<h1>Logged Out</h1>
					<p>You have been logged out successfully.</p>
					<Button href="/login">Go to login</Button>
				</Tile>
			</div>
		</Column>
	</Row>
</Grid>

<style>
	.logged-card {
		margin-top: 4rem;
	}
	p {
		margin: 1rem 0 2rem;
	}
</style>
