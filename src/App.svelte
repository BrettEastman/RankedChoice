<script lang="ts">
  import { candidateCount, voterCount } from './utils/stores';
  import TailwindCss from './TailwindCSS.svelte';
  import Decrementer from './lib/Decrementer.svelte';
  import Decrementer2 from './lib/Decrementer2.svelte';
  import Incrementer from './lib/Incrementer.svelte';
  import Incrementer2 from './lib/Incrementer2.svelte';
  import Resetter from './lib/Resetter.svelte';
  import Resetter2 from './lib/Resetter2.svelte';

  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>

<TailwindCss />

<main class="max-w-4xl p-4 m-auto text-center">
  <h1 class="text-3xl font-bold mt-2.5 mb-12 hover:drop-shadow-xl hover:text-[#646cffaa]">Ranked Choice Voting Calculator</h1>

  <p class="text-3xl mt-2.5 mb-4">
    How many candidates?
  </p>

  <h1 class="text-2xl font-bold">Candidates: {$candidateCount}</h1>

  <div class="text-xl mt-2.5 mb-4">
    <Incrementer />
    <Decrementer />
    <Resetter />
  </div>

  <div class="mb-24">
    <label for="candidateProg">Candidate total out of 7: {Math.floor(($candidateCount / 7) * 100)}%</label>
    <progress id="candidateProg" max="7" value={$candidateCount}></progress>
  </div>

  <p class="text-3xl mt-2.5 mb-4">
    How many voters?
  </p>

  <h1 class="text-2xl font-bold">Voters: {$voterCount}</h1>

  <div class="text-xl mt-2.5 mb-4 ">
    <Incrementer2 />
    <Decrementer2 />
    <Resetter2 />
  </div>

  <div class="mb-24">
    <label for="voterprog">Voter total out of 17: {Math.floor(($voterCount / 17) * 100)}%</label>
    <progress id="voterprog" max="17" value={$voterCount}></progress>
  </div>

  <progress value={$progress} />

  <button on:click={() => progress.set(0)}> 0% </button>

  <button on:click={() => progress.set(0.25)}> 25% </button>

  <button on:click={() => progress.set(0.5)}> 50% </button>

  <button on:click={() => progress.set(0.75)}> 75% </button>

  <button on:click={() => progress.set(1)}> 100% </button>

</main>

<style>
  progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2rem;
    width: 100%;
    height: 25px;
    border: 2px solid rgb(18, 1, 1);
    }
    progress::-webkit-progress-bar {
        background-color: rgb(252, 251, 251);
        border-radius: 2rem;
    }
    progress::-webkit-progress-value {
        background-color: rgb(119, 126, 167);
        border-radius: 2rem;
    }
</style>
