<script lang="ts">
  import TailwindCss from './TailwindCSS.svelte';
  import Button from './lib/Button.svelte';
  import Inline from './lib/Inline.svelte';
  import Stack from './lib/Stack.svelte';
  import Columns from './lib/Columns.svelte';

  import { calculateWinner } from './scripts/calculateWinner.svelte';

  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import { candidateCount1, voterCount1, candidatesStore, votersStore, electionStore, count, numberVoted } from './utils/stores';
  import PadBox from './lib/PadBox.svelte';

  let counter;
  $: counter = $count;

  // increment the number of candidates which will trigger a re-render of the form with the current number of slots to input candidate names
  let candidates = [];
  $: candidates = $candidatesStore;

  const handleCandidateSubmit = (e) => {
    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      $candidatesStore.push(value);
    }
    console.log('candidates:', candidates);
  };

  // same with voters
  let voters = [];
  $: voters = $votersStore;

  const handleVoterSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      $votersStore.push(value);
    }
    console.log('voters:', voters);
  };

  // the handleSubmit function will then process the form data and add the candidate names to the candidateData store - one object for each candidate with the candidate name and an array of three zeros for votes
  let electionData = [];
  $: electionData = $electionStore;

  const handleElectionData = () => {
    for (let candidate of $candidatesStore) {
      $electionStore.push({
        name: candidate,
        votes: [0,0,0]
      });
    }
    counter++;
    // console.log('handleElectionData counter:', counter);
    // console.log('electionData:', electionData);
  };

  let voted = 0;
  $: voted = $numberVoted;

  // Add votes from each voter
  const handleVoteSubmit = (e) => {
    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      for (let result of electionData) {
        if (result.name === value) {
          result.votes[key]++;
        }
      }
    }
    voted++;
    // console.log('voted:', voted);
    console.log('electionData:', electionData);
    // console.log('handleVoteSubmit counter:', counter);
  };

  let winner;
  function incrementCounter() {
    winner = calculateWinner(electionData);
    counter++;
    // console.log('counter incremented:', counter);
    console.log('the winner is: ', winner)
  }

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
    if ($candidateCount1 < 5) {
      candidateCount.update((n) => n + 1);
      $candidateCount1 += 1;
    }
  }

  function decrementCandidate() {
    if ($candidateCount1 > 0) {
      candidateCount.update((n) => n - 1);
      $candidateCount1 -= 1;
    }
  }

  function resetCandidate() {
    candidateCount.set(0);
    $candidateCount1 = 0;
  }

  function incrementVoter() {
    if ($voterCount1 < 20) {
      voterCount.update((n) => n + 1);
      $voterCount1 += 1;
    }
  }

  function decrementVoter() {
    if ($voterCount1 > 0) {
      voterCount.update((n) => n - 1);
      $voterCount1 -= 1;
    }
  }

  function resetVoter() {
    voterCount.set(0);
    $voterCount1 = 0;
  }
</script>

<TailwindCss />

<main class="max-w-4xl p-4 m-auto text-center">
  {#if counter === 0}
    <Stack gutter="gap-2">
      <h1 class="text-3xl font-bold mt-2.5 mb-8 hover:drop-shadow-xl hover:text-[#646cffaa]">Ranked Choice Voting Calculator</h1>
      <p class="text-xl mt-2.5 mb-4">
        How many candidates?
      </p>

      <h1 class="text-lg font-bold">Candidates: {Math.floor($candidateCount)}</h1>

      <div class="text-xl mt-2.5 mb-4">
        <Inline gutter="gap-4" justify="justify-center">
          <Button onClick={incrementCandidate}> + </Button>
          <Button onClick={decrementCandidate}> - </Button>
          <Button onClick={resetCandidate} color="bg-red-500"> Reset </Button>
        </Inline>
      </div>

      <Stack gutter="gap-4">
        <label for="candidateProg">Candidate total out of 5: {Math.floor(($candidateCount / 5) * 100)}%</label>
        <progress id="candidateProg" max="5" value={$candidateCount}></progress>
      </Stack>

    <!-- input each of the candate names to each form input, then press submit to trigger the handleSubmit function -->
      <div class="mb-12">
        <form on:submit|preventDefault={handleCandidateSubmit}>
          {#each Array($candidateCount1) as _, candidateIndex}
            <PadBox padding={1}>
              <label>
                Candidate {candidateIndex + 1}:
                <input type="text" id="text" name={`candidate${candidateIndex}`} value="" />
              </label>
            </PadBox>
          {/each}

          <button type="submit">Submit Candidate Names</button>
        </form>
      </div>

      <p class="text-xl mt-2.5 mb-4">
        How many voters?
      </p>

      <h1 class="text-lg font-bold">Voters: {Math.ceil($voterCount)}</h1>

      <div class="text-xl mt-2.5 mb-4 ">
        <Inline gutter="gap-4" justify="justify-center">
          <Button onClick={incrementVoter}> + </Button>
          <Button onClick={decrementVoter}> - </Button>
          <Button onClick={resetVoter} color="bg-red-500"> Reset </Button>
        </Inline>
      </div>

      <Stack gutter="gap-4">
        <label for="voterprog">Voter total out of 20: {Math.floor(($voterCount / 20) * 100)}%</label>
        <progress id="voterprog" max="20" value={$voterCount}></progress>
      </Stack>

      <div class="mb-12">
        <form on:submit|preventDefault={handleVoterSubmit}>
          {#each Array($voterCount1) as _, voterIndex}
            <PadBox padding={1}>
              <label>
                Voter {voterIndex + 1}:
                <input type="text" id="text" name={`voter${voterIndex}`} value="" />
              </label>
            </PadBox>
          {/each}

          <button type="submit">Submit Voter Names</button>
        </form>
      </div>
    </Stack>

    {#if $candidateCount1 > 0 && $voterCount1 > 0}
      <div class="mb-24">
        <Button onClick={handleElectionData}>Go to Ballot</Button>
      </div>
    {/if}
  {/if}

  {#if counter === 1}
    <h1 class="text-3xl font-bold mb-8">Candidates</h1>
    <Columns columns={$candidateCount} switchAt="sm">
      {#each $electionStore as candidate}
        <div class="text-2xl font-bold">
          <h2>{candidate.name}</h2>
        </div>
      {/each}
    </Columns>

    {#each $votersStore as voter}
      <h2>{voter}</h2>

      <div class="mb-24">
          <form on:submit|preventDefault={handleVoteSubmit}>
            {#each $candidatesStore as candidate, candidateIndex}
              <div>
                <label>
                  {candidateIndex + 1}:
                  <input type="text" id="text" name={`${candidateIndex}`} value="" />
                </label>
              </div>
            {/each}

            <button type="submit">Submit Candidate Names</button>
          </form>
        </div>
    {/each}

    {#if voted >= 4}
      <div class="mb-24">
        <Button onClick={incrementCounter}>Go to final vote</Button>
      </div>
    {/if}
  {/if}

  {#if counter === 2}
    <div>The winner is {winner}</div>
  {/if}
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
