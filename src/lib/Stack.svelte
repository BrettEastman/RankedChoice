<script>
  export let gutter = 'gap-2';
</script>

<!--
@component
Stack is a layout component designed to 'stack' items on top of each other while maintaining a consistent gutter between each item. It was originally developed for Woodshed.

| Prop   | Type   | Options                             | Default | Description                           |
| ------ | ------ | ----------------------------------- | ------- | ------------------------------------- |
| gutter | string | Tailwind class name such as 'gap-4' | 'gap-2' | Used to set the spacing between items |
-->

<div class="flex flex-col {gutter}">
  <slot />
</div>
