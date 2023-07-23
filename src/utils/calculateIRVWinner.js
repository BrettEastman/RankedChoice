function calculateIRVWinner(candidateData) {
  // Create a deep copy of the candidateData array to avoid modifying the original data
  const data = JSON.parse(JSON.stringify(candidateData));

  // Calculate the total number of votes in the first round
  const totalVotes = data.reduce((sum, candidate) => sum + candidate.votes[0], 0);

  // Helper function to find the candidate with the lowest votes in a given round
  function findLowestCandidateIndex(round) {
    let lowestIndex = -1;
    let lowestVotes = Number.MAX_SAFE_INTEGER;

    data.forEach((candidate, index) => {
      if (candidate.votes[round] < lowestVotes) {
        lowestIndex = index;
        lowestVotes = candidate.votes[round];
      }
    });

    return lowestIndex;
  }

  // Helper function to check if a candidate has a majority in a given round
  function hasMajority(candidateIndex, round) {
    return data[candidateIndex].votes[round] / totalVotes > 0.5;
  }

  let round = 0;

  while (data.length > 1) {

    // Check for majority in the current round
    for (let i = 0; i < data.length; i++) {
      if (hasMajority(i, round)) {
        return data[i].name; // We have a winner
      }
    }

    // Find the candidate with the lowest votes in the current round
    const lowestIndex = findLowestCandidateIndex(round);

    // Eliminate the candidate with the lowest votes in the current round
    data.splice(lowestIndex, 1);

    // Redistribute votes to remaining candidates
    data.forEach((candidate) => {
      for (let i = round + 1; i < candidate.votes.length; i++) {
        candidate.votes[i] += candidate.votes[round];
      }
    });

    // Move to the next round
    round++;
  }

  // If there's only one candidate remaining, they are the winner
  return data[0].name;
}

// Example usage:
const candidateData = [
  { name: 'orange', votes: [3, 5, 12] },
  { name: 'green', votes: [5, 7, 8] },
  { name: 'purple', votes: [7, 8, 5] },
  { name: 'blue', votes: [5, 8, 7] },
];

const winner = calculateIRVWinner(candidateData);
console.log(`The winner is: ${winner}`);
