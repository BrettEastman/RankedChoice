import { writable } from 'svelte/store';

export const candidateCount1 = writable(0);
export const voterCount1 = writable(0);
export const candidatesStore = writable([]);
export const votersStore = writable([]);
// export const candidateData = writable([]);
// export const candidateData = writable([{name: '', votes: []}]);

// // Example data:
// const candidateData = [
//   { name: 'blue', votes: [5, 8, 7] },
//   { name: 'purple', votes: [7, 8, 5] },
//   { name: 'green', votes: [5, 7, 8] },
//   { name: 'orange', votes: [3, 5, 12] },
// ];

// const candidateData2 = [
//   { name: 'Mix', votes: [2, 0, 3] },
//   { name: 'Tame Impala', votes: [1, 3, 1] },
//   { name: 'Stereo Lab', votes: [2, 2, 1] },
// ];