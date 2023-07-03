<script lang="ts">
  import { counterCount, voterCount } from './utils/stores';
  import TailwindCss from './TailwindCSS.svelte';
  import Decrementer from './lib/Decrementer.svelte';
  import Decrementer2 from './lib/Decrementer2.svelte';
  import Incrementer from './lib/Incrementer.svelte';
  import Incrementer2 from './lib/Incrementer2.svelte';
  import Resetter from './lib/Resetter.svelte';
  import Resetter2 from './lib/Resetter2.svelte';

  let countValue;
  let voterValue;

  counterCount.subscribe((value) => {
    countValue = value;
  })

  voterCount.subscribe((value) => {
    voterValue = value;
  })
</script>

<TailwindCss />

<main class="max-w-4xl p-4 m-auto text-center">
  <h1 class="text-3xl font-bold mt-2.5 mb-12 hover:drop-shadow-xl hover:text-[#646cffaa]">Ranked Choice Voting Calculator</h1>

  <p class="text-3xl mt-2.5 mb-4">
    How many candidates?
  </p>

  <h1 class="text-2xl font-bold">Candidates: {countValue}</h1>

  <div class="text-xl mt-2.5 mb-24 ">
    <Incrementer />
    <Decrementer />
    <Resetter />
  </div>

  <p class="text-3xl mt-2.5 mb-4">
    How many voters?
  </p>

  <h1 class="text-2xl font-bold">Voters: {voterValue}</h1>

  <div class="text-xl mt-2.5 mb-2.5 ">
    <Incrementer2 />
    <Decrementer2 />
    <Resetter2 />
  </div>

</main>

<style>
</style>
