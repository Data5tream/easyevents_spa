<script lang="ts">
  import {
    Button,
    ButtonSet,
    Column,
    Form,
    FormGroup,
    FormLabel,
    Grid,
    InlineNotification,
    Loading,
    ProgressIndicator,
    ProgressStep,
    Row,
    Slider,
    TextArea,
    TextInput,
    Tile,
    Toggle,
  } from 'carbon-components-svelte';
  import { isMobile } from '$lib/stores.js';
  import EventDateTimePicker from '$lib/components/EventDateTimePicker.svelte';
  import EventReview from '$lib/components/EventReview.svelte';
  import { createEvent } from '$lib/api_service';
  import { goto } from '$app/navigation';

  let mobile = true;
  isMobile.subscribe((value) => {
    mobile = value;
  });

  let loading = false;

  let title = '';
  let description = '';
  let details_url = '';

  let maxParticipants = 8;
  let requireConfirmation = true;

  let signupStart: Date;
  let signupEnd: Date;
  let signUpError = false;

  let eventStart: Date;
  let eventEnd: Date;
  let eventError = false;

  const now = new Date();

  let activeTab = 0;
  let finishedTab = 0;

  let invalidTitle = false;
  let invalidDescription = false;

  let dateErrors: Array<string> = [];

  /**
   * Validate first step
   */
  const checkStep0 = () => {
    invalidTitle = title.length < 4;
    invalidDescription = description.length < 16 || description.length > 512;

    if (!invalidTitle && !invalidDescription) {
      activeTab = 1;
      finishedTab = 1;
    }
  };

  /**
   * Validate second step
   */
  const checkStep1 = () => {
    dateErrors = [];
    if (isNaN(signupStart.getTime())) {
      dateErrors.push('invalid date');
    }
    if (signupStart > signupEnd || eventStart > eventEnd) {
      dateErrors.push('Invalid date ranges selected. The end dates need to come after the start dates');
    }
    if (signupEnd > eventStart) {
      dateErrors.push('Signup period must finished before event start');
    }

    if (!!dateErrors.length || signUpError || eventError) {
      return;
    }

    activeTab = 2;
    finishedTab = 2;
  };

  const submitEvent = async () => {
    loading = true;
    const id = await createEvent({
      title,
      description,
      details_url,
      max_participants: maxParticipants,
      require_confirmation: requireConfirmation,
      start_date: eventStart.toISOString(),
      end_date: eventEnd.toISOString(),
      signup_start: signupStart.toISOString(),
      signup_end: signupEnd.toISOString(),
    });

    loading = false;
    if (id !== null) {
      await goto(`/events/${id}`);
    }
  };
</script>

<h1>Create a new event</h1>
<Loading active={loading} />
<Grid noGutter>
  <Row>
    <Column>
      <ProgressIndicator spaceEqually bind:currentIndex={activeTab} vertical={mobile}>
        <ProgressStep
          complete={finishedTab > 0}
          invalid={invalidTitle || invalidDescription}
          label="Step 1: Title & Description"
        />
        <ProgressStep complete={finishedTab > 1} label="Step 2: Participation settings" />
        <ProgressStep label="Step 3: Review" />
      </ProgressIndicator>
    </Column>
  </Row>
  <Row>
    {#if activeTab === 0}
      <Column lg={16}>
        <h2>Step 1: Title & Description</h2>
      </Column>
      <Column lg={8}>
        <Form on:submit={checkStep0}>
          <FormGroup>
            <TextInput
              labelText="Title"
              helperText="This title will be shown to users when they visit the signup form"
              placeholder="Enter the title for the event..."
              bind:value={title}
              maxlength={128}
              required
              invalid={invalidTitle}
              invalidText="The title must be between 4 and 128 characters long"
            />
          </FormGroup>
          <FormGroup>
            <TextArea
              labelText="Description"
              helperText="A short description that will be shown together with the title"
              placeholder="Enter a short description..."
              bind:value={description}
              required
              maxCount={512}
              invalid={invalidDescription}
              invalidText="The description must be between 16 and 512 characters"
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              type="url"
              labelText="Details URL (optional)"
              helperText="Link to the page where users can find more information about your event"
              placeholder="https://example.com/your_event"
              bind:value={details_url}
            />
          </FormGroup>
          <Button type="submit">Next</Button>
        </Form>
      </Column>
      <Column lg={8}>
        <FormLabel>Preview</FormLabel>
        <Tile>
          <div class="preview">
            <h3>{title.length > 0 ? title : '(title)'}</h3>
            <p>{description.length > 0 ? description : '(description)'}</p>
            <input type="email" placeholder="Input your email here..." />
            <button>Join event</button>
          </div>
        </Tile>
        <InlineNotification
          hideCloseButton
          kind="info"
          title="Default preview:"
          subtitle="Other styles can be selected later."
        />
      </Column>
    {:else if activeTab === 1}
      <Column lg={16}>
        <h2>Step 2: Participation settings</h2>
      </Column>
      <Column lg={16}>
        <Form on:submit={checkStep1}>
          <FormGroup>
            <Slider
              labelText="Maximum participants"
              min={1}
              max={512}
              maxLabel={mobile ? '' : '512 participants'}
              fullWidth
              bind:value={maxParticipants}
            />
          </FormGroup>
          <FormGroup>
            <Toggle labelText="Require confirmation" bind:toggled={requireConfirmation} labelA="No" labelB="Yes" />
          </FormGroup>
          <Row>
            <Column>
              <FormGroup legendText="Signup times">
                <EventDateTimePicker
                  bind:startDatetime={signupStart}
                  bind:endDatetime={signupEnd}
                  bind:hasError={signUpError}
                  minDate={now}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="Event times">
                <EventDateTimePicker
                  bind:startDatetime={eventStart}
                  bind:endDatetime={eventEnd}
                  bind:hasError={eventError}
                  minDate={now}
                />
              </FormGroup>
            </Column>
          </Row>
          {#if !!dateErrors.length}
            <Row>
              <Column>
                {#each dateErrors as errMsg}
                  <InlineNotification title="Date error:" subtitle={errMsg} />
                {/each}
              </Column>
            </Row>
          {/if}
          <ButtonSet>
            <Button kind="secondary" on:click={() => (activeTab = 0)}>Back</Button>
            <Button type="submit">Next</Button>
          </ButtonSet>
        </Form>
      </Column>
    {:else if activeTab === 2}
      <Column lg={16}>
        <h2>Step 3: Review</h2>
      </Column>
      <Column>
        <EventReview
          {title}
          {description}
          {details_url}
          max_participants={maxParticipants}
          require_confirmation={requireConfirmation}
          {signupStart}
          {signupEnd}
          {eventStart}
          {eventEnd}
        />
        <ButtonSet>
          <Button kind="secondary" on:click={() => (activeTab = 1)}>Back</Button>
          <Button on:click={submitEvent}>Create event</Button>
        </ButtonSet>
      </Column>
    {/if}
  </Row>
</Grid>

<style>
  .preview {
    padding: 2rem;
    text-align: center;
  }

  .preview p {
    margin: 1rem 2rem;
  }

  .preview input,
  .preview button {
    background: #ddd;
    border: 0;
    padding: 0.25rem 0.5rem;
  }
</style>
