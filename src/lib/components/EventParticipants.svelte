<script lang="ts">
  import { DataTable } from 'carbon-components-svelte';
  import type { EventParticipant } from '$lib/api_service';

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
</script>

<DataTable {title} description="Users that have joined the event" {headers} rows={participants} />
