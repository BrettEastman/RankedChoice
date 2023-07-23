<script>
  import { _cx } from '../scripts/_cx.svelte';
  import { getSpacing } from '../utils/getSpacing.svelte';

  export let switchAt = '';
  export let gutter = 'gap-4';
  export let justify = 'justify-start';
  export let align = 'items-start';
  export let minItemWidth = 24;

  const minWidth = getSpacing(minItemWidth);

  let switchObj = {
      '2xsm': 'flex-col 2xsm:flex-row',
      xsm: 'flex-col xsm:flex-row',
      sm: 'flex-col sm:flex-row',
      md: 'flex-col md:flex-row',
      lg: 'flex-col lg:flex-row',
      xl: 'flex-col xl:flex-row',
      '2xl': 'flex-col 2xl:flex-row',
  };

  /* if switchAt is empty, then it will be flex-row, otherwise it will be flex-col below the screen size specified by switchAt and flex-row at or above this screen size */
  const switchAtClass = switchAt.length > 0 ? switchObj[switchAt] : '';

  const className = _cx(
      'inlineParent',
      'flex',
      switchAtClass,
      gutter,
      justify,
      align
  );
</script>

<!--
@component
Inline is a layout component that is essentially a `<div`> with `display: flex;`. It is used to create a horizontal row of items. If you provide a `switchAt` property, it will become a column below the screen size specified. Originally developed by Brett Eastman and Alex Nitta for Woodshed.

| Prop         | Type   | Options                                                                                           | Default         | Description                                                                                                  |
| ------------ | ------ | ------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| switchAt     | string | Tailwind class name - must be one of '2xsm', 'xsm', 'sm', 'md', 'lg', 'xl', or '2xl'              | -               | When the screen is below this width, the items will be displayed in a column with `flex-direction: 'column'` |
| gutter       | string | Tailwind class name such as 'gap-4'                                                               | 'gap-4'         | Used to set the spacing between items                                                                        |
| justify      | string | Tailwind class name - must be one of 'justify-center' 'justify-end', or 'justify-start'           | 'justify-start' | Used to justify the items                                                                                    |
| align        | string | Tailwind class name - must be one of 'items-center' 'items-end' 'items-start', or 'items-stretch' | 'items-start'   | Used to align the items                                                                                      |
| minItemWidth | number | Single number                                                                                     | 24              | Used to set a minimum width for each of the children                                                         |
-->

<div class={className} style={`--minW: ${minWidth}`}>
  <slot />
</div>

<style>
  :global(.inlineParent > *) {
      min-width: var(--minW);
  }
</style>
