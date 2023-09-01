<script lang="ts">
  import { pageTitle } from '$lib/stores';
  import { Column, DataTable, Grid, Link, Row } from 'carbon-components-svelte';
  import { Launch } from 'carbon-icons-svelte';
  import QuickStats from '$lib/components/QuickStats.svelte';
  import QuickLinks from '$lib/components/QuickLinks.svelte';
  import type { EventUpdate } from '$lib/api_service';
  import { onDestroy, onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';

  export let data;

  let updates: Array<EventUpdate>;
  $: updates = data.data.updates.map((upd: EventUpdate) => ({
    ...upd,
    name: `${upd.user.first_name} ${upd.user.last_name}`,
    id: `${upd.user.email}-${upd.timestamp}`,
  }));

  // Update data every 5 seconds. so we get the newest updates
  let updateInterval: number;
  onMount(() => {
    updateInterval = setInterval(invalidateAll, 10000);
  });
  onDestroy(() => {
    clearInterval(updateInterval);
  });

  pageTitle.set('Dashboard');
</script>

<Grid noGutter>
  <Row>
    <Column>
      <h1>Dashboard</h1>
    </Column>
  </Row>
  <Row>
    <Column md={4}>
      <QuickLinks />
      <QuickStats events={data.data.events.length} />
    </Column>
    <Column md={4}>
      <DataTable
        title="Updates"
        description="The latest updates related to events you have created"
        headers={[
          { key: 'name', value: 'Name' },
          { key: 'event.title', value: 'Event' },
          { key: 'event_type', value: 'Action' },
          { key: 'timestamp', value: 'Timestamp' },
        ]}
        rows={updates}
      >
        <svelte:fragment slot="cell" let:cell let:row>
          {#if cell.key === 'timestamp'}
            {new Date(cell.value).toLocaleString()}
          {:else if cell.key === 'event.title'}
            <Link icon={Launch} href="events/{row.event.id}">{cell.value}</Link>
          {:else if cell.key === 'event_type'}
            {#if cell.value === 'joined'}
              <span class="success">Joined</span>
            {:else if cell.value === 'kicked'}
              <span class="danger">Kicked</span>
            {:else if cell.value === 'left'}
              <span class="danger">Left</span>
            {:else}
              {cell.value}
            {/if}
          {:else}
            {cell.value}
          {/if}
        </svelte:fragment>
      </DataTable>
    </Column>
  </Row>
</Grid>

<style>
  .success {
    color: var(--c-success);
  }
  .danger {
    color: var(--c-danger);
  }
</style>
