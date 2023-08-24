<script lang="ts">
  import { pageTitle } from '$lib/stores';
  import { Column, DataTable, Grid, Row, Tile } from 'carbon-components-svelte';
  import QuickStats from '$lib/components/QuickStats.svelte';
  import QuickLinks from '$lib/components/QuickLinks.svelte';

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
      <QuickStats />
    </Column>
    <Column md={4}>
      <Tile>
        <h2>Updates</h2>
        <DataTable
          headers={[
            { key: 'name', value: 'Name' },
            { key: 'event', value: 'Event' },
            { key: 'acc', value: 'Action' }
          ]}
          rows={[
            { id: 1, name: 'Alice', event: 'Test Event', acc: 'joined' },
            { id: 2, name: 'Bob', event: 'Test Event', acc: 'joined' },
            { id: 3, name: 'Charlie', event: 'Test Event', acc: 'joined' },
            { id: 4, name: 'Bob', event: 'Test Event 2', acc: 'left' },
            { id: 5, name: 'Charlie', event: 'Test Event 3', acc: 'joined' },
            { id: 6, name: 'Alice', event: 'Test Event 4', acc: 'left' },
            { id: 7, name: 'Alice', event: 'Test Event 5', acc: 'joined' }
          ]}
        />
      </Tile>
    </Column>
  </Row>
</Grid>
