<script lang="ts">
  import { TimePicker } from 'carbon-components-svelte';

  export let value: string;

  const timePattern = '[0-2]?\\d:[0-5]\\d';

  const formatTime = (event: KeyboardEvent) => {
    if (!event.target) {
      return;
    }

    const ele = event.target as HTMLInputElement;
    let val = ele.value;

    if (val.length > 2 && !val.includes(':')) {
      ele.value = `${val.substring(0, 2)}:${val.substring(2)}`;
    }
  };
</script>

<TimePicker {...$$props} on:keyup={formatTime} bind:value pattern={timePattern} />
