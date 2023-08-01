<script>
  import { getSpacing } from '../scripts/getSpacing.svelte';

  export let maxWidth = '640px';
  export let centerText = false;
  export let centerChildren = false;

  const centerChildrenClass = centerChildren
      ? 'flex flex-col justify-center items-center'
      : '';

  // If the maxWidth is a string, we'll use it without modifying it
  let finalMaxWidth = maxWidth;

  if (typeof maxWidth === 'number') {
      // If the maxWidth is a number, we need to convert it to a Tailwind spacing value
      finalMaxWidth = getSpacing(maxWidth);
  } else if (typeof maxWidth !== 'string') {
      throw new Error('maxWidth must be a number or a string');
  }
</script>

<!--
@component
The Center component is designed to center and clamp its width at a predefined value. You can also center the children and text alignment as well. Originally developed by Brett Eastman and Alex Nitta.

| Prop           | Type             | Options                                                                                                 | Default | Description                               |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| maxWidth       | string or number | If a string, any CSS width declaration will work. If a number, must be a valid Tailwind spacing number. | '640px' | Used to set a maximum width for the items |
| centerText     | boolean          | true or false                                                                                           | -       | Used to center the text in the div        |
| centerChildren | boolean          | true or false                                                                                           | -       | Used to center the children elements      |

-->

<div
  class={centerChildrenClass}
  style={`max-width: ${finalMaxWidth}; ${
      centerText ? 'text-align: center;' : ''
  }`}
>
  <slot />
</div>
