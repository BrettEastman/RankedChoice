<script>
  export let color = "bg-primary hover:bg-primaryDark";
  export let addClass = "";

  export let onClick = function () {
    // Click handler goes here
  };

  const className = `${addClass} rounded-full px-3 py-1 tracking-wide text-white font-bold text-sm border-solid border-1 shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] ${color} active:bg-primaryDark`;
</script>

<!--
@component
Button is a styled button component that can be used to create a button with a background color and a shadow. Adapted from component library originally developed by Brett Eastman and Alex Nitta.

| Prop     | Type     | Options                     | Default                            | Description                                                                                      |
| -------- | -------- | --------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| color    | string   | Any Tailwind bg color class | 'bg-primary hover:bg-primaryDark'  | Indicates the background color of the button. You can optionally include diffrent color on hover |
| addClass | string   | Any Tailwind/CSS class      | ''                                 | Can be any Tailwind class name or standard CSS class name                                        |
| onClick  | function |                             | -                                  | Callback invoked when button is clicked                                                          |
-->

<button class={className} on:click={onClick}>
  <slot />
</button>
