<script lang="ts">
  import { pageTitle } from '$lib/stores';
  import { Breadcrumb, BreadcrumbItem, Column, Grid, Row } from 'carbon-components-svelte';
  import ChangePassword from '$lib/components/ChangePassword.svelte';
  import ChangeAccountDetails from '$lib/components/ChangeAccountDetails.svelte';

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
      <ChangeAccountDetails />
    </Column>
    <Column>
      <ChangePassword />
    </Column>
  </Row>
</Grid>
