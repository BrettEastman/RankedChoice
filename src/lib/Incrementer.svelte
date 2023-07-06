<script>
  import { candidateCount } from '../utils/stores';
  import Button from './Button.svelte';

  function increment() {
    candidateCount.update((n) => n + 1);

  }
</script>

<Button onClick={increment}> + </Button>
