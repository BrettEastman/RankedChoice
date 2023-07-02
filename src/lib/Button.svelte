<script>
  export let color = 'blue';

  export let onClick = function () {
      // Click handler goes here
  };

  const colors = {
      blue: 'bg-blue-500',
      gold: 'bg-gold-500',
  };
</script>

<!--
@component
Button is a styled button component that can be used to create a button with a background color and a shadow.

| Prop    | Type     | Options          | Default | Description                                  |
| ------- | -------- | ---------------- | ------- | -------------------------------------------- |
| color   | string   | 'blue' or 'gold' | 'blue'  | Indicates the background color of the button |
| onClick | function |                  | -       | Callback invoked when button is clicked      |
-->

<button
  class="rounded-lg px-5 py-2 tracking-wide text-white shadow-[rgba(0,_0,_0,_0.24)_0px_4px_4px] {color ===
  'blue'
      ? colors.blue
      : colors.gold}"
  on:click={onClick}
>
  <slot />
</button>
