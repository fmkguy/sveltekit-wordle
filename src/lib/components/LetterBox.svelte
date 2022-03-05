<script lang="ts">
  import { LETTER_GUESS_STATES } from '$lib/utils/constants';

  export let state: LETTER_GUESS_STATES | '' = '';
  export let size: 'large' | 'small' = 'large';
</script>

<style lang="scss">
 .letter-box {
 	background: rgba(0, 0, 0, 0.02);
 	border: 2px rgba(0, 0, 0, 0.15) solid;
 	border-radius: 0.15em;
 	box-sizing: border-box;
 	color: rgba(0, 0, 0, 0.65);
 	font-family: 'Roboto Mono', monospace;
 	font-size: 2rem;
 	height: 1.9em;
 	line-height: 1.9em;
 	margin: 0 0.05em;
 	padding: 0 0.5em;
 	text-align: center;
 	text-transform: uppercase;
 	min-width: 1.95em;

 	@media only screen and (min-width: 640px) {
 		height: 2.4em;
 		line-height: 2.4em;
 		min-width: 2.5em;
 	}

 	&.small {
 		border-width: 1px;
 		font-size: 0.75rem;
 		height: 2em;
 		line-height: 2em;
 		min-width: 2em;
 	}
 }

 .not-present {
 	background: rgba(0, 0, 0, 0.25);
 	border-color: rgba(0, 0, 0, 0.35);
 }

 .present {
 	background: lightyellow;
 	border-color: gold;
 	color: darkgoldenrod;
 }

 .correct {
 	background: lightgreen;
 	border-color: darkgreen;
 	color: darkgreen;
 }
</style>

<div on:click class={`letter-box ${state || ''} ${size}`}>
  <slot></slot>
</div>
