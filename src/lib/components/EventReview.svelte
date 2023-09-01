<script lang="ts">
  import { Column, DataTable, Grid, Row, Tile } from 'carbon-components-svelte';
  import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';

  export let title: string;
  export let description: string;
  export let details_url: string;
  export let max_participants: number;
  export let require_confirmation: boolean;
  export let signupStart: Date;
  export let signupEnd: Date;
  export let eventStart: Date;
  export let eventEnd: Date;

  const headers = [
    {
      key: 'key',
      value: 'What?',
    },
    {
      key: 'value',
      value: 'When?',
    },
  ];

  let rows: Array<DataTableRow> = [];
  $: rows = [
    {
      id: 0,
      key: 'Signup start',
      value: signupStart.toLocaleString(),
    },
    {
      id: 1,
      key: 'Signup end',
      value: signupEnd.toLocaleString(),
    },
    {
      id: 2,
      key: 'Event start',
      value: eventStart.toLocaleString(),
    },
    {
      id: 3,
      key: 'Event end',
      value: eventEnd.toLocaleString(),
    },
  ];
</script>

<Grid noGutter>
  <Row>
    <Column lg={8}>
      <Tile>
        <h3>Title</h3>
        <p>{title}</p>
        <hr />
        <h3>Description</h3>
        <p>{description}</p>
        <hr />
        <p>Max participants: <strong>{max_participants}</strong></p>
        <p>Require confirmation: <strong>{require_confirmation ? 'Yes' : 'No'}</strong></p>
        {#if details_url}
          <p>Details URL: <strong>{details_url}</strong></p>
        {/if}
      </Tile>
    </Column>
    <Column lg={8}>
      <DataTable title="Schedule" description="Following times were selected for this event" {headers} {rows} />
    </Column>
  </Row>
</Grid>
