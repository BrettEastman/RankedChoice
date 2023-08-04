<script>
  import { electionStore, candidatesStore, votersStore } from '../utils/stores.js';

  let electionResult;
  $: electionResult = $electionStore;

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
    console.log('electionResult:', electionResult);
  };
</script>

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
