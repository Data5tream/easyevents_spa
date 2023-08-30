<script lang="ts">
  import NewEventForm from '$lib/components/NewEventForm.svelte';
  import { pageTitle } from '$lib/stores';
	import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';

  pageTitle.set('Create event');
</script>

<Breadcrumb noTrailingSlash style="margin-bottom: 1rem">
	<BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
	<BreadcrumbItem href="/events">Events</BreadcrumbItem>
	<BreadcrumbItem href="/events/new" isCurrentPage>New event</BreadcrumbItem>
</Breadcrumb>

<NewEventForm />
