<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
		import {
			Content,
			Header,
			HeaderAction,
			HeaderPanelDivider, HeaderPanelLink,
			HeaderPanelLinks,
			HeaderUtilities, SideNav, SideNavItems, SideNavLink,
			SkipToContent
		} from 'carbon-components-svelte';
		import { UserAvatarFilledAlt } from 'carbon-icons-svelte';
		import { logout } from '$lib/auth_service';

		let isSideNavOpen = false;
		let isAccMenuOpen = false;

</script>

<Header company='EasyEvents' bind:isSideNavOpen>
	<svelte:fragment slot='skip-to-content'>
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderAction bind:isOpen={isAccMenuOpen} icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Account</HeaderPanelDivider>
				<HeaderPanelLink>Your Profile</HeaderPanelLink>
				<HeaderPanelLink>Account Settings</HeaderPanelLink>
				<HeaderPanelDivider>Actions</HeaderPanelDivider>
				<HeaderPanelLink on:click={logout}>Logout</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text='Home' href='/' />
	</SideNavItems>
</SideNav>

<Content>
	<slot />
</Content>
