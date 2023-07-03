<script>
  import { candidateCount } from '../utils/stores.js';
  import Button from './Button.svelte';

  function reset() {
    candidateCount.set(0);
  }
</script>

<Button onClick={reset} color="bg-red-500"> Reset </Button>
