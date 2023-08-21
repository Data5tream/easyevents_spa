<script lang='ts'>
	import {
		Content,
		Header,
		HeaderAction,
		HeaderPanelDivider, HeaderPanelLink,
		HeaderPanelLinks,
		HeaderUtilities, SideNav, SideNavItems, SideNavLink,
		SkipToContent
	} from 'carbon-components-svelte';
	import { Dashboard, Events, EventSchedule, UserAvatarFilledAlt } from 'carbon-icons-svelte';

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
				<HeaderPanelLink href='/logout'>Logout</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail>
	<SideNavItems>
		<SideNavLink icon={Dashboard} text='Dashboard' href='/' />
		<SideNavLink icon={EventSchedule} text='Events' href='/events' />
		<SideNavLink icon={Events} text='Participants' />
	</SideNavItems>
</SideNav>

<Content>
	<slot />
</Content>
