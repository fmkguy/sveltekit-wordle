<script lang="ts">
	// import { onMount } from 'svelte';
	export let loading: boolean = false;
	let ref;

	// onMount(() => {
	//   ref.focus();
	// });
</script>

<style lang="scss">
	button {
		background: #ff3e00;
		border: none;
		border-radius: 4px;
		color: white;
		cursor: pointer;
		display: block;
		margin: 0 auto;
		padding: 8px 12px;

		&[disabled='true'],
		&[aria-disabled='true'] {
			color: rgba(255, 255, 255, 0.8);
		}
	}
</style>

<button bind:this={ref} disabled={loading} aria-disabled={loading} on:click>
	<slot></slot>
</button>
