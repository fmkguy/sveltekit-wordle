<script lang="ts">
  import { LETTER_GUESS_STATES, TRY_COUNT } from '$lib/utils/constants';

  export let validations = [];

  function getEmojiFromState(state) {
  	switch (state) {
  		case LETTER_GUESS_STATES.present:
  			return '🟨';
  		case LETTER_GUESS_STATES.correct:
  			return '🟩';
  		default:
  			return '⬛';
  	}
  }

  function printRow(row) {
  	return row.map(({ state }) => getEmojiFromState(state)).join('');
  }
</script>

<style scoped>
  .summary {
  	font-weight: 300;
  	line-height: 1em;
  	margin: 1rem auto 2rem auto;
  }
</style>

<div class="summary">
  <p>Summary: {validations.length}/{TRY_COUNT}</p>
  <p>
    {#each validations as row}
      { printRow(row) }
      <br>
    {/each}
  </p>
</div>
