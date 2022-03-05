<script lang="ts">
  import { guess, validationsMap } from '$lib/stores/store';
  import LetterBox from './LetterBox.svelte';

  export let handleBackspace;
  export let handleGuess;

  let keyboard = [
  	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  	['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const handleClick = (letter: string) => {
  	guess.update(v => v + letter);
  };
</script>

<style>
  .legend {
  	align-items: center;
  	display: flex;
  	flex-direction: column;
  	margin-bottom: 2rem;
  }

  h2 {
  	font-size: 0.8rem;
  	font-variant-caps: all-small-caps;
  	font-weight: 300;
  	letter-spacing: 0.05em;
  	margin: 0 auto 0.5em auto;
  }

  .keyboard-row {
  	display: flex;
  	margin: 0.1em auto;
  }
</style>

<div class="legend">
  <h2>Legend:</h2>
  {#each keyboard as row, i}
    <div class="keyboard-row">
    {#each row as letter, j}
      {#if i === keyboard.length - 1 && j === 0}
        <!-- Add Enter key to start of last row -->
        <LetterBox
          on:click={handleGuess}
          size="small"
          state={null}
          >
          Enter
        </LetterBox>
      {/if}
      <LetterBox
        on:click={() => handleClick(letter)}
        size="small"
        state={$validationsMap[letter] && $validationsMap[letter].state || null}
        >
        {letter}
      </LetterBox>
      {#if i === keyboard.length - 1 && j === row.length - 1}
        <!-- Add backspace key to end of last row -->
        <LetterBox
          on:click={handleBackspace}
          size="small"
          state={null}
          >
          Backspace
        </LetterBox>
      {/if}
    {/each}
    </div>
  {/each}
</div>
