<script lang="ts">
  import {
    Button,
    DataTable,
    InlineNotification,
    Loading,
    Modal,
    Toolbar,
    ToolbarBatchActions
  } from 'carbon-components-svelte';
  import type { EventParticipant } from '$lib/api_service';
  import { removeEventParticipants } from '$lib/api_service';
  import { TrashCan } from 'carbon-icons-svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let eventId: number;
  export let participants: Array<EventParticipant>;
  export let max_participants: number;

  const headers = [
    {
      key: 'first_name',
      value: 'First name'
    },
    {
      key: 'last_name',
      value: 'Last name'
    },
    {
      key: 'email',
      value: 'Email'
    }
  ];

  let title: string;
  $: title = `Participants (${participants.length} of ${max_participants})`;

  let selectedRowIds: Array<number> = [];
  let open = false;

  let selectedParticipants: Array<EventParticipant> = [];
  $: selectedParticipants = participants.filter((p) => selectedRowIds.includes(p.id));

  let loading = false;
  let submitted = false;
  let successful = false;
  const remove_participants = async () => {
    open = false;
    loading = true;
    successful = await removeEventParticipants(eventId, selectedRowIds);
    submitted = true;
    loading = false;

    if (successful) {
      selectedRowIds = [];
      dispatch('update');
    }
  };
</script>

<Loading active={loading} />

<DataTable
  batchSelection
  bind:selectedRowIds
  sortable
  {title}
  description="Users that have joined the event"
  {headers}
  rows={participants}
>
  <Toolbar>
    <ToolbarBatchActions>
      <Button icon={TrashCan} on:click={() => (open = true)}>Remove from event</Button>
    </ToolbarBatchActions>
  </Toolbar>
</DataTable>

{#if submitted}
  {#if successful}
    <InlineNotification kind="success" title="Success:" subtitle="Participants removed successfully" />
  {:else}
    <InlineNotification kind="error" title="Error:" subtitle="Something went wrong..." />
  {/if}
{/if}

<Modal
  bind:open
  danger
  modalHeading="Remove participants from event"
  primaryButtonText="Remove participants"
  secondaryButtonText="Cancel"
  primaryButtonIcon={TrashCan}
  on:click:button--primary={remove_participants}
  on:click:button--secondary={() => (open = false)}
>
  <p>Following participants will be removed from the event and their slots will be freed:</p>
  <ul>
    {#each selectedParticipants as selected}
      <li>{selected.first_name} {selected.last_name} ({selected.email})</li>
    {/each}
  </ul>
  <p>This action will free <strong>{selectedRowIds.length}</strong> slots.</p>
</Modal>

<style>
  ul {
    padding: 1rem 0;
  }
  li {
    padding: 0.25rem 0;
  }
</style>
