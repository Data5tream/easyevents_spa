<script lang="ts">
  import 'carbon-components-svelte/css/g90.css';
  import '$lib/style.css';
  import { isMobile, pageTitle } from '$lib/stores';
  import { checkMobile } from '$lib/util.js';

  let width: number;

  $: isMobile.set(checkMobile(width));
  $: title = $pageTitle ? `${$pageTitle} \u2014 EasyEvents` : 'EasyEvents';
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
  <title>{title}</title>
  <style>
    :root {
      --c-success: #00a5a5;
      --c-danger: #d90000;
    }
  </style>
</svelte:head>

<slot />
