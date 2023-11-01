<script>
  export let gutter = "gap-2";
  export let addClass = "";
  const className = `${addClass} ${gutter}`;
</script>

<!--
@component
Stack is a layout component designed to 'stack' items on top of each other while maintaining a consistent gutter between each item. Adapted from component library originally developed by Brett Eastman and Alex Nitta.

| Prop     | Type   | Options                             | Default | Description                                               |
| -------- | ------ | ----------------------------------- | ------- | --------------------------------------------------------- |
| gutter   | string | Tailwind class name such as 'gap-4' | 'gap-2' | Used to set the spacing between items                     |
| addClass | string | Any Tailwind/CSS class              | ''      | Can be any Tailwind class name or standard CSS class name |
-->

<div class="flex flex-col {className}">
  <slot />
</div>
