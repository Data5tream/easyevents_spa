<script lang="ts">
  import EventReview from '$lib/components/EventReview.svelte';
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';

  export let data;
  const event = data.event;
</script>

<Breadcrumb noTrailingSlash style="margin-bottom: 1rem">
  <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="/events">Events</BreadcrumbItem>
  <BreadcrumbItem href="/events/{event.id}" isCurrentPage>{event.title}</BreadcrumbItem>
</Breadcrumb>

<EventReview
  title={event.title}
  description={event.description}
  maxParticipants={event.max_participants}
  requireConfirmation={event.require_confirmation}
  eventStart={new Date(Date.parse(event.start_date))}
  eventEnd={new Date(Date.parse(event.end_date))}
  signupStart={new Date(Date.parse(event.signup_start))}
  signupEnd={new Date(Date.parse(event.signup_end))}
/>
