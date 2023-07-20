<script lang="ts">
  import TailwindCss from './TailwindCSS.svelte';
  import Button from './lib/Button.svelte';
  import Inline from './lib/Inline.svelte';
  import Stack from './lib/Stack.svelte';

  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  const candidateCount = tweened(0,
    {
      duration: 400,
      easing: cubicOut
    }
  );

  const voterCount = tweened(0,
    {
      duration: 400,
      easing: cubicOut
    }
  );

  function incrementCandidate() {
    candidateCount.update((n) => n + 1);
  }

  function decrementCandidate() {
    candidateCount.update((n) => n - 1);
  }

  function resetCandidate() {
    candidateCount.set(0);
  }

  function incrementVoter() {
    voterCount.update((n) => n + 1);
  }

  function decrementVoter() {
    voterCount.update((n) => n - 1);
  }

  function resetVoter() {
    voterCount.set(0);
  }
</script>

<TailwindCss />

<main class="max-w-4xl p-4 m-auto text-center">
  <Stack gutter="gap-4">
    <h1 class="text-3xl font-bold mt-2.5 mb-12 hover:drop-shadow-xl hover:text-[#646cffaa]">Ranked Choice Voting Calculator</h1>

    <p class="text-3xl mt-2.5 mb-4">
      How many candidates?
    </p>

    <h1 class="text-2xl font-bold">Candidates: {Math.floor($candidateCount)}</h1>

    <div class="text-xl mt-2.5 mb-4">
      <Inline gutter="gap-4" justify="justify-center">
        <Button onClick={incrementCandidate}> + </Button>
        <Button onClick={decrementCandidate}> - </Button>
        <Button onClick={resetCandidate} color="bg-red-500"> Reset </Button>
      </Inline>
    </div>

    <div class="mb-24">
      <label for="candidateProg">Candidate total out of 5: {Math.floor(($candidateCount / 5) * 100)}%</label>
      <progress id="candidateProg" max="5" value={$candidateCount}></progress>
    </div>

    <p class="text-3xl mt-2.5 mb-4">
      How many voters?
    </p>

    <h1 class="text-2xl font-bold">Voters: {Math.ceil($voterCount)}</h1>

    <div class="text-xl mt-2.5 mb-4 ">
      <Inline gutter="gap-4" justify="justify-center">
        <Button onClick={incrementVoter}> + </Button>
        <Button onClick={decrementVoter}> - </Button>
        <Button onClick={resetVoter} color="bg-red-500"> Reset </Button>
      </Inline>
    </div>

    <div class="mb-24">
      <label for="voterprog">Voter total out of 20: {Math.floor(($voterCount / 20) * 100)}%</label>
      <progress id="voterprog" max="20" value={$voterCount}></progress>
    </div>
  </Stack>
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
