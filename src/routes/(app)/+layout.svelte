<script lang="ts">
  import { page } from '$app/stores';
  import {
    Content,
    Header,
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderUtilities,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent
  } from 'carbon-components-svelte';
  import { Dashboard, Events, EventSchedule, UserAvatarFilledAlt } from 'carbon-icons-svelte';
  import { isMobile } from '$lib/stores';

  let isSideNavOpen = false;
  let isAccMenuOpen = false;

  let mobile = true;
  isMobile.subscribe((value) => {
    mobile = value;
  });

  const links = [
    {
      icon: Dashboard,
      text: 'Dashboard',
      href: '/'
    },
    {
      icon: EventSchedule,
      text: 'Events',
      href: '/events'
    },
    {
      icon: Events,
      text: 'Participants',
      href: ''
    }
  ];
</script>

<Header company="EasyEvents" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderAction bind:isOpen={isAccMenuOpen} icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Account</HeaderPanelDivider>
        <HeaderPanelLink>Your Profile</HeaderPanelLink>
        <HeaderPanelLink>Account Settings</HeaderPanelLink>
        <HeaderPanelDivider>Actions</HeaderPanelDivider>
        <HeaderPanelLink href="/logout">Logout</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>

  {#if mobile}
    <SideNav bind:isOpen={isSideNavOpen}>
      <SideNavItems>
        {#each links as link}
          <SideNavLink
            icon={link.icon}
            text={link.text}
            href={link.href}
            isSelected={link.href === $page.url.pathname}
            on:click={() => (isSideNavOpen = false)}
          />
        {/each}
      </SideNavItems>
    </SideNav>
  {/if}
</Header>

{#if !mobile}
  <SideNav bind:isOpen={isSideNavOpen} rail>
    <SideNavItems>
      {#each links as link}
        <SideNavLink icon={link.icon} text={link.text} href={link.href} isSelected={link.href === $page.url.pathname} />
      {/each}
    </SideNavItems>
  </SideNav>
{/if}

<Content>
  <slot />
</Content>
