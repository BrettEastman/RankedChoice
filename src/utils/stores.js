import { writable } from "svelte/store";

export const didVote = writable(false);
export const count = writable(0);
export const candidateCount1 = writable(3);
export const voterCount1 = writable(3);
export const candidatesStore = writable([]);
export const votersStore = writable([]);
export const electionStore = writable([]);
export const winnerStore = writable("");

// Example data:
// const electionStore = [
//   { name: 'blue', votes: [5, 8, 7] },
//   { name: 'purple', votes: [7, 8, 5] },
//   { name: 'green', votes: [5, 7, 8] },
//   { name: 'orange', votes: [3, 5, 12] },
// ];
