<script>
  import { _cx } from '../scripts/_cx.svelte';
  import screens from '../utils/screens.js';

  export let addClass = '';
  export let gutter = 'gap-4';
  export let fraction = '1/2';
  export let switchAt = '';

  let switchObj = {
      '2xsm': {
          'auto-start': 'grid-cols-1 2xsm:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 2xsm:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 2xsm:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 2xsm:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 2xsm:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 2xsm:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 2xsm:grid-cols-[3fr_1fr]',
      },
      xsm: {
          'auto-start': 'grid-cols-1 xsm:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 xsm:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 xsm:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 xsm:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 xsm:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 xsm:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 xsm:grid-cols-[3fr_1fr]',
      },
      sm: {
          'auto-start': 'grid-cols-1 sm:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 sm:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 sm:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 sm:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 sm:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 sm:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 sm:grid-cols-[3fr_1fr]',
      },
      md: {
          'auto-start': 'grid-cols-1 md:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 md:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 md:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 md:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 md:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 md:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 md:grid-cols-[3fr_1fr]',
      },
      lg: {
          'auto-start': 'grid-cols-1 lg:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 lg:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 lg:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 lg:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 lg:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 lg:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 lg:grid-cols-[3fr_1fr]',
      },
      xl: {
          'auto-start': 'grid-cols-1 xl:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 xl:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 xl:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 xl:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 xl:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 xl:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 xl:grid-cols-[3fr_1fr]',
      },
      '2xl': {
          'auto-start': 'grid-cols-1 2xl:grid-cols-[auto_1fr]',
          'auto-end': 'grid-cols-1 2xl:grid-cols-[1fr_auto]',
          '1/4': 'grid-cols-1 2xl:grid-cols-[1fr_3fr]',
          '1/3': 'grid-cols-1 2xl:grid-cols-[1fr_2fr]',
          '1/2': 'grid-cols-1 2xl:grid-cols-[1fr_1fr]',
          '2/3': 'grid-cols-1 2xl:grid-cols-[2fr_1fr]',
          '3/4': 'grid-cols-1 2xl:grid-cols-[3fr_1fr]',
      },
  };

  let fractionObj = {
      'auto-start': 'grid-cols-[auto_1fr]',
      'auto-end': 'grid-cols-[1fr_auto]',
      '1/4': 'grid-cols-[1fr_3fr]',
      '1/3': 'grid-cols-[1fr_2fr]',
      '1/2': 'grid-cols-[1fr_1fr]',
      '2/3': 'grid-cols-[2fr_1fr]',
      '3/4': 'grid-cols-[3fr_1fr]',
  };

  if (switchAt.length > 0 && !Object.keys(screens).includes(switchAt)) {
      throw new Error(
          `The value of switchAt must be one of ${Object.keys(screens).join(
              ', '
          )}`
      );
  }

  const fractionClass = fractionObj[fraction];

  /* if switchAt is empty, then it will be solely the fraction classname (default - grid-cols-2), otherwise it will be grid-cols-1 below the screen size specified by switchAt and the desired fraction split at or above this screen size */
  const switchFractionClass =
      switchAt.length > 0 ? switchObj[switchAt][fraction] : fractionClass;

  const className = _cx('grid', addClass, gutter, switchFractionClass);
</script>

<!--
@component
Split is a component designed to create a split layout based on a fractional ratio. It is essentially a `<div>` with `display: grid;` which creates two grid columns. It will enforce a standard spacing scheme through the `gutter` prop. If you provide a `switchAt` property, it will become a stack below the screen size specified by `switchAt`. Originally developed by Brett Eastman and Alex Nitta.

| Prop     | Type   | Options                                                                              | Default | Description                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| gutter   | string | Tailwind class name such as 'gap-4'                                                  | 'gap-4' | Used to set the spacing between items                                                                        |
| fraction | string | "auto-start", "auto-end", "1/4", "1/3", "1/2", "2/3", "3/4"                          | '1/2'   | Used to indicate the fractional ratio, in relation to screen width, of the first item                        |
| switchAt | string | Tailwind class name - must be one of '2xsm', 'xsm', 'sm', 'md', 'lg', 'xl', or '2xl' | -       | When the screen is below this width, the items will be displayed in a column with `flex-direction: 'column'` |
-->

<div class={className}>
  <slot />
</div>
