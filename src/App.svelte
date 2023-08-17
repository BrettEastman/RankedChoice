<script lang="ts">
  import TailwindCss from './TailwindCSS.svelte';

  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import { candidateCount1, voterCount1, candidatesStore, votersStore, electionStore, count, numberVoted, winnerStore } from './utils/stores';

  import { calculateWinner } from './scripts/calculateWinner.svelte';

  import Button from './lib/Button.svelte';
  import Inline from './lib/Inline.svelte';
  import Stack from './lib/Stack.svelte';
  import Columns from './lib/Columns.svelte';
  import PadBox from './lib/PadBox.svelte';
  import Typewriter from './lib/Typewriter.svelte';
  import Split from './lib/Split.svelte';
  import Cover from './lib/Cover.svelte';

  let counter = 0;
  $: counter = $count;

  let candidates = [];
  $: candidates = $candidatesStore;

  // increment the number of candidates which will trigger a re-render of the form with the current number of slots to input candidate names
  const handleCandidateSubmit = (e) => {
    const candidateButton = document.getElementById('candidate');
    candidateButton.disabled = true;
    candidateButton.textContent = 'Candidates submitted';

    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      $candidatesStore.push(value);
    }
    console.log('candidates:', candidates);
  };

  let voters = [];
  $: voters = $votersStore;

  // same with voters
  const handleVoterSubmit = (e) => {
    const voterButton = document.getElementById('voter');
    voterButton.disabled = true;
    voterButton.textContent = 'Voters submitted';

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
  };

  let voted = 0;
  $: voted = $numberVoted;

  // Add votes from each voter
  const handleVoteSubmit = (e) => {
    const voteButton = document.getElementById('vote');
    voteButton.disabled = true;
    voteButton.textContent = 'Submitted';

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
    console.log('electionData:', electionData);
  };

  let winner = '';
  $: winner = $winnerStore;

  function incrementCounter() {
    winner = calculateWinner(electionData);
    counter++;
  }

  const backToHome = () => {
    winnerStore.set('');
    numberVoted.set(0);
    votersStore.set([]);
    candidatesStore.set([]);
    electionStore.set([]);
    count.set(0);
    counter = 0;
  }

  const candidateCount = tweened(3,
    {
      duration: 400,
      easing: cubicOut
    }
  );

  const voterCount = tweened(3,
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

<Cover minHeight="50vh" gutter="text-center" stretchContent={true}>
  <h1 slot="top" class="text-4xl font-bold mt-2.5 mb-12 rounded-full hover:shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] cursor-pointer" on:click|preventDefault={backToHome}>Ranked Choice Voting Calculator</h1>
  <main class="max-w-4xl p-4 m-auto text-center">
    <Stack gutter="gap-12">
      {#if counter === 0}
        <Split gutter="gap-24" switchAt="lg">
          <div>
            <Stack gutter="gap-6">
              <p class="text-xl">
                How many candidates?
              </p>

              <h2 class="text-lg font-bold">Candidates: {Math.floor($candidateCount)}</h2>

              <div class="text-xl">
                <Inline gutter="gap-4" justify="justify-center">
                  <Button onClick={incrementCandidate}> + </Button>
                  <Button onClick={decrementCandidate}> - </Button>
                  <Button onClick={resetCandidate} color="bg-red-500"> Reset </Button>
                </Inline>
              </div>

              <Stack gutter="gap-2">
                <label for="candidateProg">Up to 5: {Math.floor(($candidateCount / 5) * 100)}%</label>
                <progress id="candidateProg" max="5" value={$candidateCount}></progress>
              </Stack>

              <form on:submit|preventDefault={handleCandidateSubmit}>
                <Stack gutter="gap-0.5">
                  {#each Array($candidateCount1) as _, candidateIndex}
                    <PadBox padding={1}>
                      <label>
                        Candidate {candidateIndex + 1}:
                        <input type="text" id="text" name={`candidate${candidateIndex}`} value="" />
                      </label>
                    </PadBox>
                  {/each}
                  <button class="candidate" id="candidate" type="submit">Submit Candidate Names</button>
                </Stack>
              </form>
            </Stack>
          </div>

          <div>
            <Stack gutter="gap-6">
              <p class="text-xl">
                How many voters?
              </p>

              <h2 class="text-lg font-bold">Voters: {Math.ceil($voterCount)}</h2>

              <div class="text-xl">
                <Inline gutter="gap-4" justify="justify-center">
                  <Button onClick={incrementVoter}> + </Button>
                  <Button onClick={decrementVoter}> - </Button>
                  <Button onClick={resetVoter} color="bg-red-500"> Reset </Button>
                </Inline>
              </div>

              <Stack gutter="gap-2">
                <label for="voterprog">Up to 20: {Math.floor(($voterCount / 20) * 100)}%</label>
                <progress id="voterprog" max="20" value={$voterCount}></progress>
              </Stack>

              <form on:submit|preventDefault={handleVoterSubmit}>
                <Stack gutter="gap-0.5">
                  {#each Array($voterCount1) as _, voterIndex}
                    <PadBox padding={1}>
                      <label>
                        Voter {voterIndex + 1}:
                        <input type="text" id="text" name={`voter${voterIndex}`} value="" />
                      </label>
                    </PadBox>
                  {/each}
                  <button class="voter" id="voter" type="submit">Submit Voter Names</button>
                </Stack>
              </form>
            </Stack>
          </div>
        </Split>
        {#if $candidateCount1 > 0 && $voterCount1 > 0}
          <div class="scale-150 mt-4 rounded-s-full">
            <Button onClick={handleElectionData}>Go to Ballot</Button>
          </div>
        {/if}
      {/if}
    </Stack>


    <Stack gutter="gap-12">
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

          <div class="mb-16">
              <form on:submit|preventDefault={handleVoteSubmit}>
                {#each $candidatesStore as candidate, candidateIndex}
                  <div>
                    <label>
                      {candidateIndex + 1}:
                      <input type="text" id="text" name={`${candidateIndex}`} value="" />
                    </label>
                  </div>
                {/each}

                <button class="vote" id="vote" type="submit">Submit</button>
              </form>
            </div>
        {/each}

        {#if voted >= voters.length}
          <div class="mb-24">
            <Button onClick={incrementCounter}>Go to final vote</Button>
          </div>
        {/if}
      {/if}
    </Stack>

    <Stack gutter="gap-12">
      {#if counter === 2}
        <div class="text-xl">
          <Typewriter winner={winner}/>
        </div>
      {/if}
    </Stack>
  </main>

  <div slot="bottom" class="mt-12">
    <p class="text-sm">Made by <a href="https://www.brettaustineastman.com/" target="_blank">Brett Eastman</a></p>
  </div>
</Cover>

<style>
  progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    border-radius: 2rem;
    width: 100%;
    height: 15px;
    border: 1px solid white;
    }
    progress::-webkit-progress-bar {
        background-color: rgb(252, 251, 251);
        border-radius: 2rem;
    }
    progress::-webkit-progress-value {
        background-color: rgb(92, 115, 196);
        border-radius: 2rem;
    }

  button {
    border: 1px solid;
    border-radius: 2rem;
    padding: .15rem auto;
    background-color: rgb(59 130 246);
    color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
  }
  button:hover {
    background-color: rgb(29 78 216);
  }
  button:disabled {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  }

  button.vote {
    padding: 2px 10px;
  }

  button.candidate {
    margin-top: 16px;
  }

  button.voter {
    margin-top: 16px;
  }

  #text {
    border: 1px solid white;
    border-radius: 2rem;
    padding: 2px 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    cursor: pointer;
  }
</style>
