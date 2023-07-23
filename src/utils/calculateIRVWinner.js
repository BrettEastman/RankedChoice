function calculateIRVWinner(candidateData) {
  const data = JSON.parse(JSON.stringify(candidateData));

  const totalVotes = data.reduce((sum, candidate) => sum + candidate.votes[0], 0);

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

  let round = 0;

  while (data.length > 1) {
    let highestCount = 0;
    let majorityWinner = '';

    for (let candidateIndex = 0; candidateIndex < data.length; candidateIndex++) {
      let currentTally = data[candidateIndex].votes[round];
      let hasMajority = currentTally / totalVotes > 0.5;
      if (hasMajority && currentTally > highestCount) {
        highestCount = currentTally;
        majorityWinner = data[candidateIndex].name;
      }
    }

    if (majorityWinner !== '') {
      return majorityWinner;
    }

    const lowestIndex = findLowestCandidateIndex(round);

    // Eliminate the candidate with the lowest votes in the current round
    data.splice(lowestIndex, 1);

    // Redistribute votes to remaining candidates
    data.forEach((candidate) => {
      candidate.votes[round + 1] += candidate.votes[round];
      // for (let i = round + 1; i < candidate.votes.length; i++) {
      //   candidate.votes[i] += candidate.votes[round];
      // }
    });

    // Move to the next round
    round++;
  }

  // If there's only one candidate remaining, they are the winner
  return data[0].name;
}

// Example usage:
const candidateData = [
  { name: 'blue', votes: [5, 8, 7] },
  { name: 'purple', votes: [7, 8, 5] },
  { name: 'green', votes: [5, 7, 8] },
  { name: 'orange', votes: [3, 5, 12] },
];

const candidateData2 = [
  { name: 'Mix', votes: [2, 0, 3] },
  { name: 'Tame Impala', votes: [1, 3, 1] },
  { name: 'Stereo Lab', votes: [2, 2, 1] },
];

const winner = calculateIRVWinner(candidateData2);
console.log(`The winner is: ${winner}`);
