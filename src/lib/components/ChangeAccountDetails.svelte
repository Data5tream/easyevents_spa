<script lang="ts">
  import { user } from '$lib/stores';
  import { loadProfile, updateAccountDetails } from '$lib/api_service';

  import { Button, Form, FormGroup, InlineNotification, Loading, TextInput, Tile } from 'carbon-components-svelte';

  let first_name = $user.first_name;
  let last_name = $user.last_name;

  let sent = false;
  let success = false;
  let loading = false;

  const submit = async () => {
    loading = true;
    success = await updateAccountDetails(first_name, last_name);
    sent = true;

    if (success) {
      await loadProfile();
    }

    loading = false;
  };
</script>

<Loading active={loading} />

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
    <Button type="submit" disabled={first_name === $user.first_name && last_name === $user.last_name}>
      Change account details
    </Button>
  </Form>
</Tile>

{#if sent}
  {#if success}
    <InlineNotification kind="success" title="Success:" subtitle="Account details changed" />
  {:else}
    <InlineNotification kind="error" title="Error:" subtitle="Account details not changed" />
  {/if}
{/if}
