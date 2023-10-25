<script lang="ts">
  import Stack from "./Stack.svelte";

  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) dialog.showModal();
</script>

<!--
@component
The Modal component is a customized version of the Modal component in the Svelte tutorial.
https://svelte.dev/examples/modal

-->

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <Stack gutter="gap-4">
      <slot name="header" />
      <hr />
      <slot />
      <hr />
      <!-- svelte-ignore a11y-autofocus -->
      <button autofocus on:click={() => dialog.close()}>close</button>
    </Stack>
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
    background: aliceblue;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    background-color: white;
    color: black;
    border-radius: 2rem;
    padding: 2px 10px;
    border: 1px solid;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px;
  }
</style>
