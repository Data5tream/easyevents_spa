<script lang="ts">
	import {
		Button,
		Column,
		Form,
		FormGroup,
		Grid,
		InlineNotification,
		PasswordInput,
		Row,
		TextInput
	} from 'carbon-components-svelte';

	import { login } from '$lib/auth_service';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMsg = '';
	let loading = false;

	const onLogin = async () => {
		loading = true;
		const res = await login(email, password);
		loading = false;
		if (res.status === 401) {
			errorMsg = res.detail ?? 'Unknown error';
			password = '';
		} else {
			await goto('/');
		}
	};
</script>

<Grid>
	<Row>
		<Column md={{ span: 4, offset: 2 }}>
			<h1>Easy Events</h1>
			<h2>Creator Login</h2>
			<Form on:submit={onLogin}>
				{#if errorMsg}
					<InlineNotification kind="error" title="Error:" subtitle={errorMsg} />
				{/if}
				<FormGroup>
					<TextInput
						disabled={loading}
						labelText="Email"
						placeholder="Enter email..."
						type="email"
						required
						invalid={!!errorMsg}
						bind:value={email}
					/>
				</FormGroup>
				<FormGroup>
					<PasswordInput
						disabled={loading}
						labelText="Password"
						placeholder="Enter password..."
						required
						invalid={!!errorMsg}
						bind:value={password}
					/>
				</FormGroup>
				<Button skeleton={loading} type="submit">Login</Button>
			</Form>
			<InlineNotification
				hideCloseButton
				kind="warning"
				title="This login is only for event organizers:"
				subtitle="If you want to join a event, you're at the wrong place."
			/>
		</Column>
	</Row>
</Grid>

<style>
	h1 {
		margin: 92px 0 32px;
	}

	h2 {
		margin-bottom: 2rem;
	}
</style>
