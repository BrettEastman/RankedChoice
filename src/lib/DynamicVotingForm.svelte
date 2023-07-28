<script>
  import { candidateCount1, voterCount1 } from '../utils/stores';
  // Define reactive variables for candidates and voters
  // let candidateCount = 3;
  // let voterCount = 5;

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Process the form data here
    // For example, you can access the form data using event.target
    // and handle the voting data accordingly
    console.log(event.target);
  }
</script>

<style>
  /* Add your CSS styles here */
  /* For example, you can style the form elements and layout */
</style>

<h1>Dynamic Voting Form</h1>

<form on:submit={handleSubmit}>
  <!-- Dynamic rendering of candidate inputs -->
  {#each Array($candidateCount1) as _, candidateIndex}
    <div>
      <label>
        Candidate {candidateIndex + 1}:
        <input type="text" name={`candidate${candidateIndex}`} required />
      </label>
    </div>
  {/each}

  <!-- Dynamic rendering of voter inputs -->
  {#each Array($voterCount1) as _, voterIndex}
    <div>
      <label>
        Voter {voterIndex + 1}:
        <input type="text" name={`voter${voterIndex}`} required />
      </label>
    </div>
  {/each}

  <button type="submit">Submit Votes</button>
</form>

<button on:click={() => ($candidateCount1 += 1)}>Add Candidate</button>
<button on:click={() => ($voterCount1 += 1)}>Add Voter</button>
<button on:click={() => ($candidateCount1 -= 1)}>Remove Candidate</button>
<button on:click={() => ($voterCount1 -= 1)}>Remove Voter</button>
