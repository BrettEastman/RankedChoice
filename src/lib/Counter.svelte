<script lang="ts">
  import Button from "./Button.svelte";

  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<Button onClick={increment}>
  count is {count}
</Button>
