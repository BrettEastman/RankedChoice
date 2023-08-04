<script>
  import { electionStore, candidatesStore, votersStore, count } from '../utils/stores.js';

  let electionResult;
  $: electionResult = $electionStore;

  let counter;
  $: counter = $count;

  const handleVoteSubmit = (e) => {
    const formData = new FormData(e.target);
    for (let field of formData) {
      const [key, value] = field;
      for (let result of electionResult) {
        if (result.name === value) {
          result.votes[key]++;
        }
      }
    }
    counter++;
    console.log('electionResult:', electionResult);
    console.log('counterBallot:', counter);
  };
</script>

{#each $votersStore as voter}
  <h2>{voter}</h2>

  <div class="mb-24">
      <form on:submit|preventDefault={handleVoteSubmit}>
        {#each $candidatesStore as candidateIndex}
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
