<script>
  import { Button } from 'carbon-components-svelte';
</script>

<div class="error-page">
  <h1>404</h1>
  <div>
    <h2>No event found</h2>
    <Button href="/events">Go to event list</Button>
  </div>
</div>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;
  }
  h1 {
    text-align: center;
  }
</style>
