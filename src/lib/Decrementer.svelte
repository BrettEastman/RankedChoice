<script>
  import { candidateCount } from '../utils/stores.js';
  import Button from './Button.svelte';

  function decrement() {
    candidateCount.update((n) => n - 1);
  }
</script>

<Button onClick={decrement}> - </Button>
