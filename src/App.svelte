<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import TailwindCss from './TailwindCSS.svelte';
</script>

<TailwindCss />

<main class="max-w-4xl p-4 m-auto text-center">
  <h1 class="text-3xl font-bold mt-2.5 mb-2.5 hover:drop-shadow-xl hover:text-[#646cffaa]">Ranked Choice Voting Calculator</h1>

  <p class="text-2xl mt-2.5 mb-2.5 ">
    How many?
  </p>

  <div class="text-red-500 text-3xl mt-2.5 mb-2.5 ">
    <Counter />
  </div>

</main>

<style>
</style>
