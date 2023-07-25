<script>
  // Define the candidates and voters
  const candidates = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  const voters = ['Voter 1', 'Voter 2', 'Voter 3', 'Voter 4', 'Voter 5'];

  // Store the vote rankings
  let rankings = voters.map(() => [0, 0, 0]);

  // Function to update the rankings when a voter makes a selection
  function updateRanking(voterIndex, choiceIndex, ranking) {
    rankings[voterIndex][ranking - 1] = choiceIndex;
  }

  // Function to handle form submission
  function handleSubmit() {
    // You can process the rankings here and determine the winner using the ranked-choice voting algorithm
    console.log(rankings);
  }
</script>

<style>
  /* Add your CSS styles here */
</style>

<h1>Ranked Choice Voting Form</h1>

<form on:submit|preventDefault={handleSubmit}>
  {#each voters as voter, voterIndex}
    <fieldset>
      <legend>{voter}</legend>
      {#each candidates as candidate, candidateIndex}
        <label>
          <input
            type="radio"
            name={`voter${voterIndex}`}
            value={candidateIndex}
            on:change={() => updateRanking(voterIndex, candidateIndex, 1)}
          />
          {candidate} (1st choice)
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`voter${voterIndex}`}
            value={candidateIndex}
            on:change={() => updateRanking(voterIndex, candidateIndex, 2)}
          />
          {candidate} (2nd choice)
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`voter${voterIndex}`}
            value={candidateIndex}
            on:change={() => updateRanking(voterIndex, candidateIndex, 3)}
          />
          {candidate} (3rd choice)
        </label>
        <br />
      {/each}
    </fieldset>
    <br />
  {/each}
  <button type="submit">Submit Votes</button>
</form>
