<script>
  export let color = 'bg-blue-500';

  export let onClick = function () {
      // Click handler goes here
  };
</script>

<!--
@component
Button is a styled button component that can be used to create a button with a background color and a shadow. Adapted from component library originally developed by Brett Eastman and Alex Nitta.

| Prop    | Type     | Options                     | Default       | Description                                  |
| ------- | -------- | --------------------------- | ------------- | -------------------------------------------- |
| color   | string   | Any Tailwind bg color class | 'bg-blue-500' | Indicates the background color of the button |
| onClick | function |                             | -             | Callback invoked when button is clicked      |
-->

<button
  class="rounded-full px-4 py-1 tracking-wide text-white text-sm shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] {color} active:bg-blue-700"
  on:click={onClick}
>
  <slot />
</button>
