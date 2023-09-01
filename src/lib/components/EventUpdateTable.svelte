<script lang="ts">
  import { DataTable, Pagination, Tile } from 'carbon-components-svelte';
  import type { EventUpdate } from '$lib/api_service.js';

  export let ev_updates: Array<EventUpdate>;

  let updates: Array<{ id: number; name: string; event_type: string; timestamp: string }>;
  $: updates = ev_updates.map((u: EventUpdate, i: number) => ({
    id: i,
    name: `${u.user.first_name} ${u.user.last_name}`,
    event_type: u.event_type,
    timestamp: new Date(u.timestamp).toLocaleString()
  }));

  let pageSize = 10;
  let page = 1;
</script>

{#if updates.length}
  <DataTable
    title="Event Updates"
    description="User updates related to this event"
    headers={[
      { key: 'name', value: 'Name' },
      { key: 'event_type', value: 'Action' },
      { key: 'timestamp', value: 'Timestamp' }
    ]}
    rows={updates}
    {pageSize}
    {page}
  >
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === 'event_type'}
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
  <Pagination bind:pageSize bind:page totalItems={updates.length} />
{:else}
  <Tile>
    <h4>No updates yet</h4>
    <p class="bx--data-table-header__description">
      There are no updates for this event yet. Once users join the event, a table will appear here
    </p>
  </Tile>
{/if}

<style>
  .success {
    color: var(--c-success);
  }
  .danger {
    color: var(--c-danger);
  }
</style>
