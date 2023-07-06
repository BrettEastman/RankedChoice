<script>
  import { voterCount } from '../utils/stores';
  import Button from './Button.svelte';

  function increment() {
    voterCount.update((n) => n + 1);

  }
</script>

<Button onClick={increment}> + </Button>
