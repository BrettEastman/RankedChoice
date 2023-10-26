<script lang="ts" context="module">
  interface Candidate {
    name: string;
    votes: number[];
  }

  export function calculateWinner(candidateData: Candidate[]) {
    const data = JSON.parse(JSON.stringify(candidateData));

    const totalVotes = data.reduce(
      (sum: number, candidate: Candidate) => sum + candidate.votes[0],
      0
    );

    function findLowestCandidateIndex(round: number) {
      let lowestIndex = -1;
      let lowestVotes = Number.MAX_SAFE_INTEGER;
      data.forEach((candidate: Candidate, index: number) => {
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
      let majorityWinner = "";
      for (
        let candidateIndex = 0;
        candidateIndex < data.length;
        candidateIndex++
      ) {
        let currentTally = data[candidateIndex].votes[round];
        let hasMajority = currentTally / totalVotes > 0.5;
        if (hasMajority && currentTally > highestCount) {
          highestCount = currentTally;
          majorityWinner = data[candidateIndex].name;
        }
      }
      if (majorityWinner !== "") {
        return majorityWinner;
      }
      const lowestIndex = findLowestCandidateIndex(round);
      data.splice(lowestIndex, 1);
      data.forEach((candidate: Candidate) => {
        candidate.votes[round + 1] += candidate.votes[round];
      });
      round++;
    }
    return data[0].name;
  }
</script>

<!--
@component
The calculateWinner script is a utility for calculating the winner of an election using the Single Transferable Vote method. It is based on the logic from this article: http://www.moray.gov.uk/moray_standard/page_68268.html

The findLowestCandidateIndex helper function finds the candidate with the lowest number of votes in a given round.

-->
