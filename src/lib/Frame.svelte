<script>
  import { _cx } from '../scripts/_cx.svelte';

  export let ratio = 'square';
  export let position = 'center';

  let aspectRatio = {
      square: 'aspect-square',
      video: 'aspect-video',
      photo: 'aspect-[4/3]',
  };

  const wrapperClass = _cx('frame', 'w-full', aspectRatio[ratio]);
</script>

<!--
@component
The Frame component is useful for cropping content, typically media, to a desired aspect ratio.

| Prop     | Type   | Options                                                                                                    | Default | Description                                              |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------- |
| ratio    | string | Must be 'square', 'video', or 'photo'                                                                      | 'video' | Used to determine the ratio of the content box size      |
| position | string | Must be 'top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right' | 'center | Used to determine the relative position within the Frame |
-->

<!-- <div class={wrapperClass} style={`--position: ${position}`}>
  <slot name="content" />
</div> -->

<div class={wrapperClass}>
  <slot />
</div>

<style>
  div {
      border-width: 2px;
      border-style: dashed;
      border-color: black;
      height: 700px;
      width: 700px;
  }
  .frame :global(img) {
      object-fit: none;
      object-position: right bottom;
  }
  /* .frame :global([slot='content']) {
      position: absolute;
      block-size: 100%;
      object-fit: cover;
      object-position: center;
      object-position: var(--position);
  } */
  /* :global(.frame > :is(img, video, iframe, embed)) {
      position: absolute;
      block-size: 100%;
      object-fit: cover;
      object-position: center;
      object-position: var(--position);
  } */
</style>
