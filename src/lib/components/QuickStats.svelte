<script lang="ts">
  import { Tile } from 'carbon-components-svelte';

  export let events: number;

  let stats: Array<{ title: string; count: number }>;
  $: stats = [
    {
      title: 'Events',
      count: events
    }
  ];
</script>

<Tile>
  <h2>Quick Stats</h2>
  <div class="stats-container">
    {#each stats as stat}
      <div class="info">
        <span>{stat.count}</span>
        <span>{stat.title}</span>
      </div>
    {/each}
  </div>
</Tile>

<style>
  .stats-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .info > span:first-child {
    font-size: 5rem;
  }
</style>
