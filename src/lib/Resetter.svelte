<script>
  import { counterCount } from '../utils/stores.js';
  import Button from './Button.svelte';

  function reset() {
    counterCount.set(0);
  }
</script>

<Button onClick={reset}> Reset </Button>
