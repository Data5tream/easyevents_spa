<script lang="ts">
  import EventReview from '$lib/components/EventReview.svelte';
  import { Breadcrumb, BreadcrumbItem, Column, Grid, Row, Tile } from 'carbon-components-svelte';
  import EventParticipants from '$lib/components/EventParticipants.svelte';
  import { PUBLIC_API_HOST } from '$env/static/public';

  export let data;
  const event = data.event;
  const participants = data.event.participants;
  const event_link = `${PUBLIC_API_HOST}/signup/${event.id}/${encodeURIComponent(event.title)}`;
</script>

<Breadcrumb noTrailingSlash style="margin-bottom: 1rem">
  <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="/events">Events</BreadcrumbItem>
  <BreadcrumbItem href="/events/{event.id}" isCurrentPage>{event.title}</BreadcrumbItem>
</Breadcrumb>

<Grid noGutter>
  <Row>
    <Column>
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
    </Column>
  </Row>
  <Row>
    <Column>
      <Tile>
        <h3>Invite link</h3>
        <p><a href={event_link} target="_blank" rel="noreferrer">{event_link}</a></p>
      </Tile>
    </Column>
  </Row>
  <Row>
    <Column>
      <EventParticipants {participants} max_participants={event.max_participants} />
    </Column>
  </Row>
</Grid>
