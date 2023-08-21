<script lang="ts">
	import type { ApiEvent } from '$lib/api_service';
	import { onMount } from 'svelte';
	import { loadEvents } from '$lib/api_service';
	import {
		Button,
		DataTable,
		DataTableSkeleton,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';

	const title = 'Events';
	const description = 'Events that you have created';

	let events: Array<ApiEvent> = [];
	let loaded = false;

	const headers = [
		{
			value: 'ID',
			key: 'id'
		},
		{
			value: 'Title',
			key: 'title'
		},
		{
			value: 'Start',
			key: 'start_date'
		},
		{
			value: 'End',
			key: 'end_date'
		},
		{
			value: 'Signup start',
			key: 'signup_start'
		},
		{
			value: 'Signup end',
			key: 'signup_end'
		},
		{
			value: 'Participants',
			key: 'participants'
		}
	];

	onMount(async () => {
		events = await loadEvents();
		loaded = true;
	});
</script>

{#if !events.length && !loaded}
	<DataTableSkeleton {headers} rows={10} />
{:else}
	<DataTable {title} {description} {headers} rows={events}>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch />
				<Button>Create Event</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell>
			{#if ['start_date', 'end_date', 'signup_start', 'signup_end'].includes(cell.key)}
				{new Date(cell.value).toLocaleString()}
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
	</DataTable>
{/if}
