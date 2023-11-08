<img width="1000" alt="Screenshot 2023-11-07 at 6 01 49 PM" src="https://github.com/BrettEastman/RankedChoice/assets/76603041/544458e5-2043-432e-bd8c-f4dfebac1351">

## About

The Ranked Choice Voting Calculator is a single page web application
designed to facilitate the tally of a ranked choice vote involving 3-5
candidates and up to 20 voters. This voting method entails each voter
designating their top 3 candidates in sequential order of preference.
The tool aggregates these preferences, and if a candidate garners more
than 50% of the total vote, they are declared the winner. In instances
where no candidate achieves this, the candidate with the least support
is eliminated. Votes initially cast for the eliminated candidate as
the first choice are then reallocated to the respective second choice.
This process iterates until a candidate secures a majority. The
application is tailored for small-scale scenarios, such as voting on
team decisions at the office or selecting a movie to watch among
friends. Get 5 people to vote on a top 3 list of albums to listen to
and see which one wins!

[Try it for yourself!](https://ranked-choice-three.vercel.app/)

## Tech Stack

![Svelte](https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00)
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
