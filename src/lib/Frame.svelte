<script>
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

  const validAspectRatios = ['square', 'video', 'photo'];

  if (!validAspectRatios.includes(ratio)) {
      throw new Error(
          `Invalid ratio prop: ${ratio}. Must be one of ${Object.keys(
              validAspectRatios
          ).join(', ')}`
      );
  }

  // By using the `contents` class on the wrapper element, we ensure that the wrapper does not
  // create its own box. If the parent is a flex container, this allows the wrapped <img> or
  // <video> to act as a flex child.
  // See [Tailwind docs](https://tailwindcss.com/docs/display#contents) and
  // [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/display#box).
  const wrapperClass = `contents frame ${ratio} ${position}`;
</script>

<!--
@component
The Frame component is useful for cropping an <img> or <video> to a desired aspect ratio. Originally developed by Alex Nitta, with Brett Eastman.

| Prop     | Type   | Options                                                                                                      | Default | Description                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------- |
| ratio    | string | Must be 'square', 'video', or 'photo'                                                                        | 'photo' | A preset aspect ratio used to set the aspect ratio of the content |
| position | string | One of 'left-top', 'top', 'right-top', 'left', 'center', 'right', 'left-bottom', 'bottom', or 'right-bottom' | 'center | Used to determine the relative position within the Frame          |

-->

<div class={wrapperClass}>
  <slot />
</div>

<style>
  :global(.frame > :is(img, video)) {
      inset-block: 0;
      inset-inline: 0;
      max-height: 100%;
      max-width: 100%;
      /*
          This is the most important property, in terms of how it interacts with object-position.
          See this [css-tricks article](https://css-tricks.com/on-object-fit-and-object-position/).
      */
      object-fit: cover;
  }

  :global(.frame.left-top > :is(img, video)) {
      object-position: left top;
  }

  :global(.frame.top > :is(img, video)) {
      object-position: top;
  }

  :global(.frame.right-top > :is(img, video)) {
      object-position: right top;
  }

  :global(.frame.left > :is(img, video)) {
      object-position: left;
  }
  :global(.frame.center > :is(img, video)) {
      object-position: center;
  }
  :global(.frame.right > :is(img, video)) {
      object-position: right;
  }

  :global(.frame.left-bottom > :is(img, video)) {
      object-position: left bottom;
  }

  :global(.frame.bottom > :is(img, video)) {
      object-position: bottom;
  }

  :global(.frame.right-bottom > :is(img, video)) {
      object-position: right bottom;
  }

  :global(.frame.square > :is(img, video)) {
      aspect-ratio: 1 / 1;
  }

  :global(.frame.video > :is(img, video)) {
      aspect-ratio: 16 / 9;
  }

  :global(.frame.photo > :is(img, video)) {
      aspect-ratio: 4 / 3;
  }
</style>
