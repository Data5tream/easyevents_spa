<script lang="ts">
  import { pageTitle } from '$lib/stores';
  import { Column, DataTable, Grid, Row } from 'carbon-components-svelte';
  import QuickStats from '$lib/components/QuickStats.svelte';
  import QuickLinks from '$lib/components/QuickLinks.svelte';
  import type { EventUpdate } from '$lib/api_service';

  export let data;

  let updates: Array<EventUpdate>;
  $: updates = data.data.updates.map((upd) => ({
    ...upd,
    name: `${upd.user.first_name} ${upd.user.last_name}`,
    id: `${upd.user.email}-${upd.timestamp}`
  }));

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
        description="Updates related to events you have created."
        headers={[
          { key: 'name', value: 'Name' },
          { key: 'event.title', value: 'Event' },
          { key: 'event_type', value: 'Action' },
          { key: 'timestamp', value: 'Timestamp' }
        ]}
        rows={updates}
      >
        <svelte:fragment slot="cell" let:cell let:row>
          {#if cell.key === 'timestamp'}
            {new Date(cell.value).toLocaleString()}
          {:else if cell.key === 'event.title'}
            <a href="events/{row.event.id}">{cell.value}</a>
          {:else if cell.key === 'event_type'}
            {#if cell.value === 'joined'}
              <span class='success'>Joined</span>
            {:else }
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
</style>
