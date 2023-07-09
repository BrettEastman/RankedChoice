<script>
  import { _cx } from '../scripts/_cx.svelte';

  export let ratio = 'photo';
  export let position = 'center';

  const validPositions = [
      'left-top',
      'top',
      'right-top',
      'left',
      'center',
      'right',
      'left-bottom',
      'bottom',
      'right-bottom',
  ];

  if (!validPositions.includes(position)) {
      throw new Error(
          `Invalid position prop: ${position}. Must be one of ${validPositions.join(
              ', '
          )}`
      );
  }

  const aspectRatios = {
      square: '1/1',
      video: '16/9',
      photo: '4/3',
  };

  if (!Object.keys(aspectRatios).includes(ratio)) {
      throw new Error(
          `Invalid ratio prop: ${ratio}. Must be one of ${Object.keys(
              aspectRatios
          ).join(', ')}`
      );
  }

  const wrapperClass = _cx(ratio, position);
</script>

<!--
@component
The Frame component is useful for cropping an <img> or <video> to a desired aspect ratio.

| Prop     | Type   | Options                                                                                                      | Default | Description                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------- |
| ratio    | string | Must be 'square', 'video', or 'photo'                                                                        | 'photo' | A preset aspect ratio used to set the aspect ratio of the content |
| position | string | One of 'left-top', 'top', 'right-top', 'left', 'center', 'right', 'left-bottom', 'bottom', or 'right-bottom' | 'center | Used to determine the relative position within the Frame          |

-->

<!--
  By using `display: contents` on the wrapper element, we ensure that the wrapper does not create
  its own box. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display#box).
-->
<div style={'display: contents;'} class={wrapperClass}>
  <slot name="frame-content" />
</div>

<style>
  :global([slot='frame-content']) {
      inset-block: 0;
      inset-inline: 0;
      max-height: 100%;
      max-width: 100%;
  }

  :global([slot='frame-content']) {
      /*
          This is the most important property, in terms of how it interacts with object-position.
          See this [css-tricks article](https://css-tricks.com/on-object-fit-and-object-position/).
      */
      object-fit: cover;
  }

  :global(.left-top > [slot='frame-content']) {
      object-position: left top;
  }

  :global(.top > [slot='frame-content']) {
      object-position: top;
  }

  :global(.right-top > [slot='frame-content']) {
      object-position: right top;
  }

  :global(.left > [slot='frame-content']) {
      object-position: left;
  }
  :global(.center > [slot='frame-content']) {
      object-position: center;
  }
  :global(.right > [slot='frame-content']) {
      object-position: right;
  }

  :global(.left-bottom > [slot='frame-content']) {
      object-position: left bottom;
  }

  :global(.bottom > [slot='frame-content']) {
      object-position: bottom;
  }

  :global(.right-bottom > [slot='frame-content']) {
      object-position: right bottom;
  }

  :global(.square > [slot='frame-content']) {
      aspect-ratio: 1/1;
  }

  :global(.video > [slot='frame-content']) {
      aspect-ratio: 16/9;
  }

  :global(.photo > [slot='frame-content']) {
      aspect-ratio: 4/3;
  }
</style>
