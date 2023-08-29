<script lang="ts">
  import { user } from '$lib/stores';
  import { loadProfile, updateAccountDetails } from '$lib/api_service';

  import { Button, Form, FormGroup, InlineNotification, TextInput, Tile } from 'carbon-components-svelte';

  let first_name = $user.first_name;
  let last_name = $user.last_name;

  let sent = false;
  let success = false;

  const submit = async () => {
    success = await updateAccountDetails(first_name, last_name);
    sent = true;

    if (success) {
      await loadProfile();
    }
  };
</script>

<Tile>
  <h2>Account details</h2>
  <Form on:submit={submit}>
    <FormGroup>
      <TextInput
        readonly
        labelText="Email"
        helperText="Your email address can not be changed currently"
        value={$user.email}
      />
    </FormGroup>
    <FormGroup>
      <TextInput labelText="First name" required bind:value={first_name} />
      <TextInput labelText="Last name" required bind:value={last_name} />
    </FormGroup>
    <Button type="submit">Change account details</Button>
  </Form>
</Tile>

{#if sent}
  {#if success}
    <InlineNotification kind="success" title="Success:" subtitle="Account details changed" />
  {:else}
    <InlineNotification kind="error" title="Error:" subtitle="Account details not changed" />
  {/if}
{/if}
