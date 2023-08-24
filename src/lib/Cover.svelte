<script lang="ts">
  import { _cx } from '../scripts/_cx.svelte';
  import { getSpacing } from '../scripts/getSpacing.svelte';

  export let minHeight = '100vh';
  export let gutter: string | undefined = 'gap-4';
  export let stretchContent = false;

  const wrapperClass = _cx('flex', 'flex-col', gutter);

  // If the minHeight is a string, we'll use it without modifying it
  let finalMinHeight = minHeight;

  if (typeof minHeight === 'number') {
      // If the minHeight is a number, we need to convert it to a Tailwind spacing value
      finalMinHeight = getSpacing(minHeight);
  } else if (typeof minHeight !== 'string') {
      throw new Error('minHeight must be a number or a string');
  }

  const wrapperStyle = `min-height: ${gutter ? '0px' : finalMinHeight};`;

  const stretchContentClass = stretchContent ? 'grow' : 'grow-0';
</script>

<!--
@component
The Cover component is designed to cover a predefined area, 100vh by default, and vertically center its child component. You can conditionally render a top and bottom component as well. Originally developed by Brett Eastman and Alex Nitta.

| Prop           | Type             | Options                                                                                                 | Default | Description                                                                          |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| minHeight      | string or number | If a string, any CSS width declaration will work. If a number, must be a valid Tailwind spacing number. | '100vh' | Used to set a minimum height for the cover screen height                             |
| gutter         | string           | Tailwind class name such as 'gap-4'                                                                     | -       | Used to set the spacing between items                                                |
| stretchContent | boolean          | true or false                                                                                           | -       | Used to stretch content of the primary child element to full height of the container |

-->

<div class={wrapperClass} style={wrapperStyle}>
  <slot name="top" />
  <div class={stretchContentClass}>
      <slot />
  </div>
  <slot name="bottom" />
</div>
