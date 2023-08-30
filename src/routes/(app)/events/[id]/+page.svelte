<script lang="ts">
  import EventReview from '$lib/components/EventReview.svelte';
  import { Breadcrumb, BreadcrumbItem, Column, Grid, Row, Tab, TabContent, Tabs, Tile } from 'carbon-components-svelte';
  import EventParticipants from '$lib/components/EventParticipants.svelte';
  import { PUBLIC_API_HOST } from '$env/static/public';
  import EventSettings from '$lib/components/EventSettings.svelte';
  import { pageTitle } from '$lib/stores';

  export let data;
  const event = data.event;
  const participants = data.event.participants;
  const event_link = `${PUBLIC_API_HOST}/signup/${event.id}/${encodeURIComponent(event.title)}`;

  pageTitle.set(`${event.title} - Event Details`);
</script>

<Breadcrumb noTrailingSlash style="margin-bottom: 1rem">
  <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="/events">Events</BreadcrumbItem>
  <BreadcrumbItem href="/events/{event.id}" isCurrentPage>{event.title}</BreadcrumbItem>
</Breadcrumb>

<Tabs>
  <Tab label="Overview" />
  <Tab label="Participants" />
  <Tab label="Settings" />
  <svelte:fragment slot="content">
    <TabContent>
      <Grid noGutter>
        <Row>
          <Column noGutter>
            <EventReview
              title={event.title}
              description={event.description}
              details_url={event.details_url}
              max_participants={event.max_participants}
              require_confirmation={event.require_confirmation}
              eventStart={new Date(Date.parse(event.start_date))}
              eventEnd={new Date(Date.parse(event.end_date))}
              signupStart={new Date(Date.parse(event.signup_start))}
              signupEnd={new Date(Date.parse(event.signup_end))}
            />
          </Column>
        </Row>
        <Row>
          <Column noGutter>
            <Tile>
              <h3>Invite link</h3>
              <p><a href={event_link} target="_blank" rel="noreferrer">{event_link}</a></p>
            </Tile>
          </Column>
        </Row>
      </Grid>
    </TabContent>
    <TabContent>
      <Grid noGutter>
        <Row>
          <Column noGutter>
            <EventParticipants {participants} max_participants={event.max_participants} />
          </Column>
        </Row>
      </Grid>
    </TabContent>
    <TabContent>
      <EventSettings {event} />
    </TabContent>
  </svelte:fragment>
</Tabs>
