<script>
  import { counterCount } from '../utils/stores.js';
  import Button from './Button.svelte';

  function decrement() {
    counterCount.update((n) => n - 1);
  }
</script>

<Button onClick={decrement}> - </Button>
