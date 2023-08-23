<script lang="ts">
  import { DatePicker, DatePickerInput, InlineNotification } from 'carbon-components-svelte';
  import CustomTimePicker from '$lib/components/CustomTimePicker.svelte';

  export let minDate: Date;

  const datePattern = '\\d{1,2}-\\d{1,2}-\\d{4}';

  export let startDatetime: Date;
  export let endDatetime: Date;
  export let hasError = false;

  let startDate = '';
  let startTime = '';
  let endDate = '';
  let endTime = '';

  let timeError = false;
  let startInputError = false;
  let endInputError = false;

  let errorList: Array<string> = [];

  const parseDateTime = (date: string, time: string): Date => {
    return new Date(Date.parse(`${date.substring(6)}-${date.substring(3, 6)}${date.substring(0, 2)}T${time}`));
  };

  $: startDatetime = parseDateTime(startDate, startTime);
  $: endDatetime = parseDateTime(endDate, endTime);
  $: startInputError = parseInt(startTime.substring(0, 2)) > 23;
  $: endInputError = parseInt(endTime.substring(0, 2)) > 23;
  $: hasError = !!errorList.length;

  $: {
    errorList = [];

    if (startDatetime > endDatetime) {
      errorList.push('End period must come after start period.');
    }
    if (startInputError) {
      errorList.push('Start time must be a valid 24h time (00:00-23:59).');
    }
    if (endInputError) {
      errorList.push('End time must be a valid 24h time (00:00-23:59).');
    }

    hasError = !!errorList.length;
  }
</script>

<div class="time-input">
  <DatePicker datePickerType="range" dateFormat="d-m-Y" {minDate} bind:valueFrom={startDate} bind:valueTo={endDate}>
    <DatePickerInput labelText="Start date" placeholder="dd-mm-yyyy" pattern={datePattern} required />
    <DatePickerInput labelText="End date" placeholder="dd-mm-yyyy" pattern={datePattern} required />
  </DatePicker>
  <CustomTimePicker labelText="Start time" bind:value={startTime} invalid={startInputError} required />
  <CustomTimePicker labelText="End time" bind:value={endTime} required invalid={timeError} />
</div>
{#each errorList as errMsg}
  <InlineNotification title="Error:" subtitle={errMsg} hideCloseButton />
{/each}

<style>
  .time-input {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .time-input :global(.bx--form-item) {
    flex: unset;
  }
</style>
