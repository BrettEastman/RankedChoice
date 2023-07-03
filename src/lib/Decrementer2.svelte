<script>
  import { voterCount } from '../utils/stores.js';
  import Button from './Button.svelte';

  function decrement() {
    voterCount.update((n) => n - 1);
  }
</script>

<Button onClick={decrement}> - </Button>
