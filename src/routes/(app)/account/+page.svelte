<script lang="ts">
  import { pageTitle, user } from '$lib/stores';
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Column,
    Form,
    FormGroup,
    Grid,
    Row,
    TextInput,
    Tile
  } from 'carbon-components-svelte';
  import ChangePassword from '$lib/components/ChangePassword.svelte';

  pageTitle.set('Account');
</script>

<Breadcrumb noTrailingSlash style="margin-bottom: 1rem">
  <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="/account" isCurrentPage>Account</BreadcrumbItem>
</Breadcrumb>

<h1>Your Account</h1>

<Grid noGutter>
  <Row>
    <Column>
      <Tile>
        <h2>Account details</h2>
        <Form>
          <FormGroup>
            <TextInput
              readonly
              labelText="Email"
              helperText="Your email address can not be changed currently"
              value={$user.email}
            />
          </FormGroup>
          <FormGroup>
            <TextInput labelText="First name" value={$user.first_name} />
            <TextInput labelText="Last name" value={$user.last_name} />
          </FormGroup>
          <Button type="submit">Change account details</Button>
        </Form>
      </Tile>
    </Column>
    <Column>
      <ChangePassword />
    </Column>
  </Row>
</Grid>
