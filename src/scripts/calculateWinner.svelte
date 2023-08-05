<script context="module">
  export function calculateWinner(candidateData) {
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
      data.splice(lowestIndex, 1);
      data.forEach((candidate) => {
        candidate.votes[round + 1] += candidate.votes[round];
      });
      round++;
    }
    return data[0].name;
  }
</script>
