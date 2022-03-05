<script lang="ts">
  import { answer, guess, validations } from '$lib/stores/store';
  import LetterBox from './LetterBox.svelte';

  export let tryIndex: number = 0;
  export let disabled: boolean = false;

  $: letterStates = $validations[tryIndex];

  $: letterObject = (i: number) => {
  	return (letterStates && letterStates[i]) || {};
  };
</script>

<style lang="scss">
  .word-row {
  	border-radius: 0.5rem;
  	display: flex;
  	justify-content: space-between;
  	margin: 0 auto 0.05rem;
  	max-width: 27rem;
  	padding: 0.3rem;
  	width: 100%;

  	&.active {
  		box-shadow: 0 0 0.5rem 0 skyblue;
  	}
  }
</style>

<div class="word-row" class:active={!disabled}>
  {#each $answer.split("") as _, i}
    <LetterBox state={letterObject(i).state || null}>
      {#if disabled}
        {letterObject(i).letter || ''}
      {:else}
        {$guess.length -1 >= i ? $guess[i] : ''}
      {/if}
    </LetterBox>
  {/each}
</div>
