<script>
  import { _cx } from '../scripts/_cx.svelte';

  export let columns = 4;
  export let switchAt = '';
  export let gutter = 'gap-4';

  const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
  };

  const gridColsForScreens = {
      '2xsm': {
          1: '2xsm:grid-cols-1',
          2: '2xsm:grid-cols-2',
          3: '2xsm:grid-cols-3',
          4: '2xsm:grid-cols-4',
          5: '2xsm:grid-cols-5',
          6: '2xsm:grid-cols-6',
          7: '2xsm:grid-cols-7',
          8: '2xsm:grid-cols-8',
          9: '2xsm:grid-cols-9',
          10: '2xsm:grid-cols-10',
          11: '2xsm:grid-cols-11',
          12: '2xsm:grid-cols-12',
      },
      xsm: {
          1: 'xsm:grid-cols-1',
          2: 'xsm:grid-cols-2',
          3: 'xsm:grid-cols-3',
          4: 'xsm:grid-cols-4',
          5: 'xsm:grid-cols-5',
          6: 'xsm:grid-cols-6',
          7: 'xsm:grid-cols-7',
          8: 'xsm:grid-cols-8',
          9: 'xsm:grid-cols-9',
          10: 'xsm:grid-cols-10',
          11: 'xsm:grid-cols-11',
          12: 'xsm:grid-cols-12',
      },
      sm: {
          1: 'sm:grid-cols-1',
          2: 'sm:grid-cols-2',
          3: 'sm:grid-cols-3',
          4: 'sm:grid-cols-4',
          5: 'sm:grid-cols-5',
          6: 'sm:grid-cols-6',
          7: 'sm:grid-cols-7',
          8: 'sm:grid-cols-8',
          9: 'sm:grid-cols-9',
          10: 'sm:grid-cols-10',
          11: 'sm:grid-cols-11',
          12: 'sm:grid-cols-12',
      },
      md: {
          1: 'md:grid-cols-1',
          2: 'md:grid-cols-2',
          3: 'md:grid-cols-3',
          4: 'md:grid-cols-4',
          5: 'md:grid-cols-5',
          6: 'md:grid-cols-6',
          7: 'md:grid-cols-7',
          8: 'md:grid-cols-8',
          9: 'md:grid-cols-9',
          10: 'md:grid-cols-10',
          11: 'md:grid-cols-11',
          12: 'md:grid-cols-12',
      },
      lg: {
          1: 'lg:grid-cols-1',
          2: 'lg:grid-cols-2',
          3: 'lg:grid-cols-3',
          4: 'lg:grid-cols-4',
          5: 'lg:grid-cols-5',
          6: 'lg:grid-cols-6',
          7: 'lg:grid-cols-7',
          8: 'lg:grid-cols-8',
          9: 'lg:grid-cols-9',
          10: 'lg:grid-cols-10',
          11: 'lg:grid-cols-11',
          12: 'lg:grid-cols-12',
      },
      xl: {
          1: 'xl:grid-cols-1',
          2: 'xl:grid-cols-2',
          3: 'xl:grid-cols-3',
          4: 'xl:grid-cols-4',
          5: 'xl:grid-cols-5',
          6: 'xl:grid-cols-6',
          7: 'xl:grid-cols-7',
          8: 'xl:grid-cols-8',
          9: 'xl:grid-cols-9',
          10: 'xl:grid-cols-10',
          11: 'xl:grid-cols-11',
          12: 'xl:grid-cols-12',
      },
      '2xl': {
          1: '2xl:grid-cols-1',
          2: '2xl:grid-cols-2',
          3: '2xl:grid-cols-3',
          4: '2xl:grid-cols-4',
          5: '2xl:grid-cols-5',
          6: '2xl:grid-cols-6',
          7: '2xl:grid-cols-7',
          8: '2xl:grid-cols-8',
          9: '2xl:grid-cols-9',
          10: '2xl:grid-cols-10',
          11: '2xl:grid-cols-11',
          12: '2xl:grid-cols-12',
      },
  };

  const switchAtClass =
      switchAt.length > 0
          ? gridColsForScreens[switchAt][columns]
          : gridCols[columns];

  const className = _cx('grid', 'grid-cols-1', switchAtClass, gutter);
</script>

<!--
@component
Columns is a component designed to create a n-column layout. It is essentially a `<div>` with `display: grid;`. If you provide a `switchAt` property, it will become a stack below the screen size specified. Originally developed by Brett Eastman and Alex Nitta.

| Prop     | Type   | Options                                                                              | Default | Description                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| columns  | number | Number from 1-12                                                                     | 4       | Used to indicate the number of columns - each component will take up one column                              |
| switchAt | string | Tailwind class name - must be one of '2xsm', 'xsm', 'sm', 'md', 'lg', 'xl', or '2xl' | -       | When the screen is below this width, the items will be displayed in a column with `flex-direction: 'column'` |
| gutter   | string | Tailwind class name such as 'gap-4'                                                  | 'gap-4' | Used to set the spacing between items                                                                        |
-->

<div class={className}>
  <slot />
</div>
