<script lang="ts">
  import type { ApiEvent } from '$lib/api_service';
  import {
    Button,
    Column,
    Form,
    FormGroup,
    Grid,
    Row,
    Select,
    SelectItem,
    TextArea,
    TextInput
  } from 'carbon-components-svelte';
  import EventThemePreview from '$lib/components/EventThemePreview.svelte';

  export let event: ApiEvent;

  let title = event.title;
  let description = event.description;
  let details_url = event.details_url;

  let theme = event.template;

  let invalidTitle = false;
  let invalidDescription = false;
</script>

<Grid noGutter>
  <Row>
    <Column lg={8} noGutter>
      <Form>
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
        <FormGroup>
          <Select labelText="Signup theme" bind:selected={theme}>
            <SelectItem value="signup/form_base.html" text="Simple (default)" />
            <SelectItem value="signup/form_dark.html" text="Dark" />
          </Select>
        </FormGroup>
        <Button type="submit">Save changes</Button>
      </Form>
    </Column>
    <Column lg={8}>
      <EventThemePreview {title} {description} {theme} />
    </Column>
  </Row>
</Grid>
