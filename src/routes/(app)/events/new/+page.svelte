<script lang="ts">
  import NewEventForm from '$lib/components/NewEventForm.svelte';
  import { pageTitle } from '$lib/stores';

  pageTitle.set('Create event');
</script>

<NewEventForm />
