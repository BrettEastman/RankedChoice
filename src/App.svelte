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
    didVote,
    winnerStore,
  } from "./utils/stores";

  import githubIcon from "./icons/github-142-svgrepo-com.svg?raw";
  import instagramIcon from "./icons/instagram-svgrepo-com.svg?raw";
  import linkedinIcon from "./icons/linkedin-rounded-svgrepo-com.svg?raw";

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
  let showGoToBallot = false;

  let counter = 0;
  $: counter = $count;

  let candidates = [];
  $: candidates = $candidatesStore;

  const handleCandidateSubmit = (e) => {
    const candidateButton: HTMLElement = document.getElementById("candidate");
    (document.getElementById("candidate") as HTMLButtonElement).disabled = true;

    candidateButton.textContent = "Candidates submitted";

    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      $candidatesStore.push(value);
    }
  };

  let voters = [];
  $: voters = $votersStore;

  const handleVoterSubmit = (e) => {
    const voterButton: HTMLElement = document.getElementById("voter");
    (document.getElementById("voter") as HTMLButtonElement).disabled = true;

    voterButton.textContent = "Voters submitted";

    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      $votersStore.push(value);
    }
    showGoToBallot = true;
  };

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

  let voted = false;
  $: voted = $didVote;

  const nameNotInElectionData = (name) => {
    for (let candidate of electionData) {
      if (candidate.name === name) {
        return false;
      }
    }
    return true;
  };

  const handleVoteSubmit = (e) => {
    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      if (nameNotInElectionData(value)) {
        alert("Please enter a valid candidate name");
        return;
      }
      for (let result of electionData) {
        if (result.name === value) {
          result.votes[key]++;
        }
      }
    }
    voted = true;
    const voteButton: HTMLElement = document.getElementById("vote");
    (document.getElementById("vote") as HTMLButtonElement).disabled = true;

    voteButton.textContent = "Submitted";

    document.getElementById("vote").scrollIntoView({ behavior: "smooth" });
  };

  let winner = "";
  $: winner = $winnerStore;

  function incrementCounter() {
    winner = calculateWinner(electionData);
    counter++;
  }

  const backToHome = () => {
    document.location.reload();
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
      $candidateCount1 += 1;
      candidateCount.update((n) => n + 1);
    }
  }

  function decrementCandidate() {
    if ($candidateCount1 > 2) {
      $candidateCount1 -= 1;
      candidateCount.update((n) => n - 1);
    }
  }

  function resetCandidate() {
    $candidateCount1 = 3;
    candidateCount.set(3);
  }

  function incrementVoter() {
    if ($voterCount1 < 20) {
      $voterCount1 += 1;
      voterCount.update((n) => n + 1);
    }
  }

  function decrementVoter() {
    if ($voterCount1 > 3) {
      $voterCount1 -= 1;
      voterCount.update((n) => n - 1);
    }
  }

  function resetVoter() {
    $voterCount1 = 3;
    voterCount.set(3);
  }
</script>

<TailwindCss />

<Cover minHeight="50vh" stretchContent={true}>
  <div slot="top" class="flex flex-col justify-center items-center mb-8">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h1
      class="max-w-max px-5 py-2 text-[2.2rem] font-bold mt-2.5 mb-2 cursor-pointer text-center md:text-[2.8rem]"
      on:click|preventDefault={backToHome}
    >
      Ranked Choice Voting Calculator
    </h1>
    <div class="scale-75 pt-4">
      <button class="about" on:click={() => (showModal = true)}
        >About this site</button
      >
    </div>
    <div class="flex flex-col justify-center items-center">
      <Modal bind:showModal>
        <h2 class="font-bold text-2xl" slot="header">
          <em>About</em>
        </h2>

        <p class="text-left">
          The Ranked Choice Voting Calculator is a single page web application
          designed to facilitate the tally of a ranked choice vote involving 3-5
          candidates and up to 20 voters. This voting method entails each voter
          designating their top 3 candidates in sequential order of preference.
          The tool aggregates these preferences, and if a candidate garners more
          than 50% of the total vote, they are declared the winner. In instances
          where no candidate achieves this, the candidate with the least support
          is eliminated. Votes initially cast for the eliminated candidate as
          the first choice are then reallocated to the respective second choice.
          This process iterates until a candidate secures a majority. The
          application is tailored for small-scale scenarios, such as voting on
          team decisions at the office or selecting a movie to watch among
          friends. Get 5 people to vote on a top 3 list of albums to listen to
          and see which one wins!
        </p>

        <a
          class="rounded-full font-bold hover:shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] cursor-pointer text-center duration-300"
          href="https://github.com/BrettEastman/RankedChoice"
          target="_blank">See the source code here</a
        >
      </Modal>
    </div>
  </div>

  <main class="max-w-4xl p-4 m-auto text-center">
    <Stack gutter="gap-12">
      {#if counter === 0}
        <Split fraction="auto-start" gutter="gap-24" switchAt="md">
          <div>
            <Stack gutter="gap-5">
              <p class="text-xl">Select number of candidates:</p>

              <h2 class="text-md font-bold">
                Candidates: {Math.floor($candidateCount1)}
              </h2>

              <div class="text-xl">
                <Inline gutter="gap-4" justify="justify-center">
                  <Button onClick={incrementCandidate} addClass="duration-300"
                    >+</Button
                  >
                  <Button onClick={decrementCandidate} addClass="duration-300"
                    >-</Button
                  >
                  <Button
                    onClick={resetCandidate}
                    color="bg-secondary hover:bg-secondaryLight"
                    addClass="duration-300"
                  >
                    Reset
                  </Button>
                </Inline>
              </div>

              <Stack gutter="gap-2" addClass="items-center mb-4">
                <label for="candidateProg"
                  >Up to 5: {Math.floor(($candidateCount / 5) * 100)}%</label
                >
                <progress id="candidateProg" max="5" value={$candidateCount} />
              </Stack>

              <form on:submit|preventDefault={handleCandidateSubmit}>
                <Stack gutter="gap-2" addClass="items-center">
                  <p class="text-lg">Write name of each candidate:</p>
                  {#each Array($candidateCount1) as _, candidateIndex}
                    <PadBox padding={1}>
                      <label>
                        Candidate {candidateIndex + 1}:
                        <input
                          type="text"
                          id="text"
                          name={`candidate${candidateIndex}`}
                          value=""
                          required
                        />
                      </label>
                    </PadBox>
                  {/each}
                  <button
                    class="candidate border border-solid border-white w-full max-w-sm"
                    id="candidate"
                    type="submit">Submit Candidate Names</button
                  >
                </Stack>
              </form>
            </Stack>
          </div>

          <div>
            <Stack gutter="gap-5">
              <p class="text-xl">Select number of voters:</p>

              <h2 class="text-md font-bold">
                Voters: {Math.ceil($voterCount1)}
              </h2>

              <div class="text-xl">
                <Inline gutter="gap-4" justify="justify-center">
                  <Button onClick={incrementVoter} addClass="duration-300"
                    >+</Button
                  >
                  <Button onClick={decrementVoter} addClass="duration-300"
                    >-</Button
                  >
                  <Button
                    onClick={resetVoter}
                    color="bg-secondary hover:bg-secondaryLight"
                    addClass="duration-300">Reset</Button
                  >
                </Inline>
              </div>

              <Stack gutter="gap-2" addClass="items-center mb-4">
                <label for="voterprog"
                  >Up to 20: {Math.floor(($voterCount / 20) * 100)}%</label
                >
                <progress id="voterprog" max="20" value={$voterCount} />
              </Stack>

              <form on:submit|preventDefault={handleVoterSubmit}>
                <Stack gutter="gap-2" addClass="items-center">
                  <p class="text-lg">Write name of each voter:</p>
                  {#each Array($voterCount1) as _, voterIndex}
                    <PadBox padding={1}>
                      <label>
                        Voter {voterIndex + 1}:
                        <input
                          type="text"
                          id="text"
                          name={`voter${voterIndex}`}
                          value=""
                          required
                        />
                      </label>
                    </PadBox>
                  {/each}
                  <button
                    class="voter border border-solid border-white w-full max-w-sm"
                    id="voter"
                    type="submit">Submit Voter Names</button
                  >
                </Stack>
              </form>
            </Stack>
          </div>
        </Split>
        {#if showGoToBallot}
          <div class="scale-125 mt-4 rounded-s-full transition-all">
            <button class="ballot" on:click={handleElectionData}
              >Go to Ballot</button
            >
          </div>
        {/if}
      {/if}
    </Stack>

    <Stack gutter="gap-2">
      {#if counter === 1}
        <h2 class="text-2xl font-bold mb-8">Vote for these candidates</h2>
        <Columns columns={$candidateCount} switchAt="sm">
          {#each $electionStore as candidate}
            <div>
              <h1 class="text-2xl font-bold">{candidate.name}</h1>
            </div>
          {/each}
        </Columns>

        <form on:submit|preventDefault={handleVoteSubmit}>
          {#each $votersStore as voter}
            <h2 class="mt-12">{voter}</h2>

            <div class="mb-12">
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
                        required
                      />
                    </label>
                  </div>
                </PadBox>
              {/each}
            </div>
          {/each}
          <button class="vote mt-2" id="vote" type="submit">Submit</button>
        </form>

        {#if voted}
          <div class="mb-24 mt-12 scale-125">
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

  <div
    slot="bottom"
    class="flex flex-col justify-center items-center gap-10 mt-16 mb-16"
  >
    <p
      class="text-sm max-w-max bg-white font-bold rounded-full px-5 py-2 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_2px_2px] duration-300"
    >
      <a href="https://www.bretteastman.dev" target="_blank"
        >Brett Austin Eastman</a
      >
    </p>
    <Inline justify="justify-center" align="items-center">
      <a
        class="flex justify-center"
        href="https://github.com/BrettEastman"
        target="_blank"
      >
        <span>
          {@html githubIcon}
        </span>
      </a>
      <a
        class="flex justify-center"
        href="https://www.linkedin.com/in/brett-austin-eastman/"
        target="_blank"
      >
        <span>
          {@html linkedinIcon}
        </span>
      </a>
      <a
        class="flex justify-center"
        href="https://www.instagram.com/brettaustineastman/"
        target="_blank"
      >
        <span>
          {@html instagramIcon}
        </span>
      </a>
    </Inline>
  </div>
</Cover>

<style>
  h1 {
    font-family: "Chivo Mono", monospace;
    letter-spacing: 0.2rem;
  }

  progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    border-radius: 2rem;
    width: 100%;
    max-width: 24rem;
    height: 15px;
    border: 1px solid white;
  }

  progress::-webkit-progress-bar {
    background-color: rgb(252, 251, 251);
    border-radius: 2rem;
  }

  progress::-webkit-progress-value {
    background-color: var(--primary);
    border-radius: 2rem;
  }

  button {
    border-radius: 2rem;
    padding: 0.15rem auto;
    background-color: var(--primary);
    color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    font-weight: 700;
    transition-duration: 300ms;
  }

  button:hover {
    background-color: var(--primary-dark);
    transition-duration: 300ms;
  }

  button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    transition-duration: 300ms;
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
    box-shadow: none;
  }

  button.about:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    transition-duration: 300ms;
  }

  button.ballot {
    padding: 2px 10px;
  }

  #text {
    border: 1px solid white;
    border-radius: 2rem;
    padding: 2px 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
    cursor: pointer;
  }
</style>
