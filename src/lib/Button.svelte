<script>
  export let color = 'bg-blue-500';

  export let onClick = function () {
      // Click handler goes here
  };
</script>

<!--
@component
Button is a styled button component that can be used to create a button with a background color and a shadow.

| Prop    | Type     | Options                     | Default       | Description                                  |
| ------- | -------- | --------------------------- | ------------- | -------------------------------------------- |
| color   | string   | Any Tailwind bg color class | 'bg-blue-500' | Indicates the background color of the button |
| onClick | function |                             | -             | Callback invoked when button is clicked      |
-->

<button
  class="rounded-lg px-5 py-2 tracking-wide text-white shadow-[rgba(0,_0,_0,_0.24)_0px_4px_4px] {color} active:bg-blue-700"
  on:click={onClick}
>
  <slot />
</button>
