<script>
  import { getSpacing } from '../scripts/getSpacing.svelte';

  export let padding = 4;
  const spacing = getSpacing(padding);
</script>

<!--
@component
PadBox is a component designed to create consistent padding based on the spacing constants. PadBox takes either a single number or an array of numbers (like the css shorthand for top / right / bottom / left) for fine tuning the padding. Originally developed by Brett Eastman and Alex Nitta.

| Prop    | Type            | Options                                         | Default | Description             |
| ------- | --------------- | ----------------------------------------------- | ------- | ----------------------- |
| padding | number or array | single number or an array of up to four numbers | 4       | Used to set the padding |
-->

<div style={`padding: ${spacing}`}>
  <slot />
</div>