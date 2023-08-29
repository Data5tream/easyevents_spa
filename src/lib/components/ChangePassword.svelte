<script lang="ts">
  import { Button, Form, FormGroup, InlineNotification, Loading, PasswordInput, Tile } from 'carbon-components-svelte';
  import { changePassword } from '$lib/api_service';

  let old_password: string;
  let new_password0: string;
  let new_password1: string;
  let disable_change_password = true;
  $: disable_change_password = !(!!old_password && !!new_password0 && new_password0 === new_password1);

  let new_password_invalid = false;
  let new_password_text = '';
  $: {
    if (new_password0) {
      if (new_password0.length < 8) {
        new_password_invalid = true;
        new_password_text = 'Must be longer then 8 characters';
      } else if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/.test(new_password0)) {
        new_password_invalid = true;
        new_password_text = 'Must contain at least one letter and one number and one special character (!#$%&?)';
      } else {
        new_password_invalid = false;
      }
    }
  }

  let repeat_password_invalid = false;
  $: repeat_password_invalid = new_password0 !== new_password1;

  let loading = false;
  let successful = false;
  let has_error = false;

  const submit = async () => {
    loading = true;

    const result = await changePassword(old_password, new_password0, new_password1);
    if (result === 'success') {
      successful = true;
      has_error = false;
      old_password = '';
      new_password0 = '';
      new_password1 = '';
    } else if (result === 'password_mismatchpassword_incorrect') {
      successful = false;
      has_error = true;
    }

    loading = false;
  };
</script>

<Loading active={loading} />

<Tile>
  <h2>Change password</h2>
  <Form on:submit={submit}>
    <FormGroup>
      <PasswordInput
        labelText="Old password"
        helperText="Input your old password"
        minlength={8}
        bind:value={old_password}
      />
    </FormGroup>
    <FormGroup>
      <PasswordInput
        labelText="New password"
        helperText="Input a new password"
        minlength={8}
        invalid={new_password_invalid}
        invalidText={new_password_text}
        bind:value={new_password0}
      />
    </FormGroup>
    <FormGroup>
      <PasswordInput
        labelText="Repeat new password"
        minlength={8}
        bind:value={new_password1}
        invalid={repeat_password_invalid}
        invalidText="Must be the same as the new password"
      />
    </FormGroup>
    <Button type="submit" disabled={disable_change_password}>Change password</Button>
  </Form>
</Tile>

{#if successful}
  <InlineNotification kind="success" title="Success:" subtitle="Password has been changed" />
{/if}
{#if has_error}
  <InlineNotification kind="error" title="Error:" subtitle="Current password is incorrect" />
{/if}
