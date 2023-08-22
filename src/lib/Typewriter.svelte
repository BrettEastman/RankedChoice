<script>
	let visible = false;

  export let winner;

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.023);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<!--
@component
The Typewriter component is a customized version of Rich Harris' Typewriter component in the Svelte tutorial.

| Prop    | Type             | Options                                             | Default | Description                                                     |
| ------- | ---------------- | --------------------------------------------------- | ------- | --------------------------------------------------------------- |
| winner  | string or number | This will always receive a value from the main App. | ''      | Used to set and display the name of the winner of the election. |

-->

<label>
	<div class="text-md mt-8">
		<input type="checkbox" bind:checked={visible} />
		Show me who won
	</div>
</label>

{#if visible}
	<p class="text-3xl font-bold mt-12" transition:typewriter>{`The winner is "${winner}"`}</p>
{/if}
