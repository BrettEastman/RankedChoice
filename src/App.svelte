<script lang="ts">
  import TailwindCss from "./TailwindCSS.svelte";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import {
    candidateCount1,
    voterCount1,
    candidatesStore,
    votersStore,
    electionStore,
    count,
    numberVoted,
    winnerStore,
  } from "./utils/stores";

  import { calculateWinner } from "./scripts/calculateWinner.svelte";

  import Button from "./lib/Button.svelte";
  import Inline from "./lib/Inline.svelte";
  import Stack from "./lib/Stack.svelte";
  import Columns from "./lib/Columns.svelte";
  import PadBox from "./lib/PadBox.svelte";
  import Typewriter from "./lib/Typewriter.svelte";
  import Split from "./lib/Split.svelte";
  import Cover from "./lib/Cover.svelte";
  import Modal from "./lib/Modal.svelte";

  let showModal = false;

  let counter = 0;
  $: counter = $count;

  let candidates = [];
  $: candidates = $candidatesStore;

  // increment the number of candidates which will trigger a re-render of the form with the current number of slots to input candidate names
  const handleCandidateSubmit = (e) => {
    const candidateButton = document.getElementById("candidate");
    candidateButton.disabled = true;
    candidateButton.textContent = "Candidates submitted";

    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      $candidatesStore.push(value);
    }
    console.log("candidates:", candidates);
  };

  let voters = [];
  $: voters = $votersStore;

  // same with voters
  const handleVoterSubmit = (e) => {
    const voterButton = document.getElementById("voter");
    voterButton.disabled = true;
    voterButton.textContent = "Voters submitted";

    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      $votersStore.push(value);
    }
    console.log("voters:", voters);
  };

  // the handleSubmit function will then process the form data and add the candidate names to the candidateData store - one object for each candidate with the candidate name and an array of three zeros for votes
  let electionData = [];
  $: electionData = $electionStore;

  const handleElectionData = () => {
    for (let candidate of $candidatesStore) {
      $electionStore.push({
        name: candidate,
        votes: [0, 0, 0],
      });
    }
    counter++;
  };

  let voted = 0;
  $: voted = $numberVoted;

  // Add votes from each voter
  const handleVoteSubmit = (e) => {
    const voteButton = document.getElementById("vote");
    voteButton.disabled = true;
    voteButton.textContent = "Submitted";

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
    console.log("electionData:", electionData);
  };

  let winner = "";
  $: winner = $winnerStore;

  function incrementCounter() {
    winner = calculateWinner(electionData);
    counter++;
  }

  const backToHome = () => {
    numberVoted.set(0);
    count.set(0);
    candidateCount1.set(3);
    voterCount1.set(3);
    candidatesStore.set([]);
    votersStore.set([]);
    electionStore.set([]);
    winnerStore.set("");
    counter = 0;
  };

  const candidateCount = tweened(3, {
    duration: 400,
    easing: cubicOut,
  });

  const voterCount = tweened(3, {
    duration: 400,
    easing: cubicOut,
  });

  function incrementCandidate() {
    if ($candidateCount1 < 5) {
      candidateCount.update((n) => n + 1);
      $candidateCount1 += 1;
    }
  }

  function decrementCandidate() {
    if ($candidateCount1 > 2) {
      candidateCount.update((n) => n - 1);
      $candidateCount1 -= 1;
    }
  }

  function resetCandidate() {
    candidateCount.set(3);
    $candidateCount1 = 3;
  }

  function incrementVoter() {
    if ($voterCount1 < 20) {
      voterCount.update((n) => n + 1);
      $voterCount1 += 1;
    }
  }

  function decrementVoter() {
    if ($voterCount1 > 3) {
      voterCount.update((n) => n - 1);
      $voterCount1 -= 1;
    }
  }

  function resetVoter() {
    voterCount.set(3);
    $voterCount1 = 3;
  }
</script>

<TailwindCss />

<Cover minHeight="50vh" gutter="text-center" stretchContent={true}>
  <div slot="top" class="flex flex-col justify-center items-center mb-8">
    <h1
      class="max-w-max px-5 py-2 text-4xl font-bold mt-2.5 mb-2 rounded-full hover:shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] cursor-pointer"
      on:click|preventDefault={backToHome}
    >
      Ranked Choice Voting Calculator
    </h1>
    <div class="scale-75">
      <button class="about" on:click={() => (showModal = true)}>About</button>
    </div>
    <div class="flex flex-col justify-center items-center">
      <Modal bind:showModal>
        <h2 class="font-bold text-2xl" slot="header">
          <em>About</em>
        </h2>

        <p class="text-left">
          The Ranked Choice Voting Calculator is a web-based tool designed to
          facilitate the calculation of ranked choice votes involving 3-5
          candidates and up to 20 voters. This voting method entails each voter
          designating their top 3 candidates in sequential order of preference.
          The tool aggregates these preferences, and if a candidate garners 50%
          of the total vote, they are declared the winner. In instances where no
          candidate achieves this threshold, the candidate with the least
          support is eliminated. Votes initially cast for the eliminated
          candidate as the first choice are then reallocated to the respective
          second choice. This process iterates until a candidate secures a
          majority. The application is tailored for small-scale scenarios, such
          as team decisions within corporate departments or selecting a movie to
          watch among friends, among other potential use cases.
        </p>

        <a
          class="rounded-full font-bold hover:shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] cursor-pointer"
          href="https://github.com/BrettEastman/RankedChoice"
          >See the source code here</a
        >
      </Modal>
    </div>
  </div>

  <main class="max-w-4xl p-4 m-auto text-center">
    <Stack gutter="gap-12">
      {#if counter === 0}
        <Split gutter="gap-24" switchAt="lg">
          <div>
            <Stack gutter="gap-6">
              <p class="text-xl">How many candidates?</p>

              <h2 class="text-lg font-bold">
                Candidates: {Math.floor($candidateCount)}
              </h2>

              <div class="text-xl">
                <Inline gutter="gap-4" justify="justify-center">
                  <Button onClick={incrementCandidate}>+</Button>
                  <Button onClick={decrementCandidate}>-</Button>
                  <Button onClick={resetCandidate} color="bg-red-500">
                    Reset
                  </Button>
                </Inline>
              </div>

              <Stack gutter="gap-2">
                <label for="candidateProg"
                  >Up to 5: {Math.floor(($candidateCount / 5) * 100)}%</label
                >
                <progress id="candidateProg" max="5" value={$candidateCount} />
              </Stack>

              <form on:submit|preventDefault={handleCandidateSubmit}>
                <Stack gutter="gap-0.5">
                  {#each Array($candidateCount1) as _, candidateIndex}
                    <PadBox padding={1}>
                      <label>
                        Candidate {candidateIndex + 1}:
                        <input
                          type="text"
                          id="text"
                          name={`candidate${candidateIndex}`}
                          value=""
                        />
                      </label>
                    </PadBox>
                  {/each}
                  <button class="candidate" id="candidate" type="submit"
                    >Submit Candidate Names</button
                  >
                </Stack>
              </form>
            </Stack>
          </div>

          <div>
            <Stack gutter="gap-6">
              <p class="text-xl">How many voters?</p>

              <h2 class="text-lg font-bold">
                Voters: {Math.ceil($voterCount)}
              </h2>

              <div class="text-xl">
                <Inline gutter="gap-4" justify="justify-center">
                  <Button onClick={incrementVoter}>+</Button>
                  <Button onClick={decrementVoter}>-</Button>
                  <Button onClick={resetVoter} color="bg-red-500">Reset</Button>
                </Inline>
              </div>

              <Stack gutter="gap-2">
                <label for="voterprog"
                  >Up to 20: {Math.floor(($voterCount / 20) * 100)}%</label
                >
                <progress id="voterprog" max="20" value={$voterCount} />
              </Stack>

              <form on:submit|preventDefault={handleVoterSubmit}>
                <Stack gutter="gap-0.5">
                  {#each Array($voterCount1) as _, voterIndex}
                    <PadBox padding={1}>
                      <label>
                        Voter {voterIndex + 1}:
                        <input
                          type="text"
                          id="text"
                          name={`voter${voterIndex}`}
                          value=""
                        />
                      </label>
                    </PadBox>
                  {/each}
                  <button class="voter" id="voter" type="submit"
                    >Submit Voter Names</button
                  >
                </Stack>
              </form>
            </Stack>
          </div>
        </Split>
        {#if $candidateCount1 > 0 && $voterCount1 > 0}
          <div class="scale-125 mt-4 rounded-s-full">
            <button class="ballot" on:click={handleElectionData}
              >Go to Ballot</button
            >
          </div>
        {/if}
      {/if}
    </Stack>

    <Stack gutter="gap-2">
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
          <h2 class="mt-12">{voter}</h2>

          <div class="mb-16">
            <form on:submit|preventDefault={handleVoteSubmit}>
              {#each $candidatesStore as candidate, candidateIndex}
                <PadBox padding={1}>
                  <div>
                    <label>
                      {candidateIndex + 1}:
                      <input
                        type="text"
                        id="text"
                        name={`${candidateIndex}`}
                        value=""
                      />
                    </label>
                  </div>
                </PadBox>
              {/each}

              <button class="vote mt-2" id="vote" type="submit">Submit</button>
            </form>
          </div>
        {/each}

        {#if voted >= voters.length}
          <div class="mb-24 scale-125">
            <Button onClick={incrementCounter}>Go to final vote</Button>
          </div>
        {/if}
      {/if}
    </Stack>

    <Stack gutter="gap-12">
      {#if counter === 2}
        <div class="text-xl">
          <Typewriter {winner} />
        </div>
      {/if}
    </Stack>
  </main>

  <div slot="bottom" class="flex flex-col justify-center items-center mt-12">
    <p
      class="text-sm max-w-max rounded-full px-5 py-2 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px]"
    >
      <em>by </em><a href="https://www.brettaustineastman.com/" target="_blank"
        >Brett Austin Eastman</a
      >
    </p>
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
    padding: 0.15rem auto;
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

  button.about {
    background-color: white;
    color: black;
    padding: 2px 10px;
  }

  #text {
    border: 1px solid white;
    border-radius: 2rem;
    padding: 2px 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    cursor: pointer;
  }
  button.about:hover {
    color: rgb(29 78 216);
  }
  button.ballot {
    padding: 2px 10px;
  }
</style>
