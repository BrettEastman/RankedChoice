<script>
  import { voterCount } from '../utils/stores';
  import Button from './Button.svelte';

  function reset() {
    voterCount.set(0);
  }
</script>

<Button onClick={reset} color="bg-red-500"> Reset </Button>
