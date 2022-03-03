<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import WordRow from '$lib/components/WordRow.svelte';
  import KeyLegend from '$lib/components/KeyLegend.svelte';
  import GameSummary from '$lib/components/GameSummary.svelte';
  import validateGuess from '$lib/utils/validateGuess';
  import { checkWord, getWord } from '$lib/utils/getWord';
  import { answer, guess, validations, validationsMap } from '$lib/stores/store';
  import {
  	GAME_STATES,
  	LETTER_COUNT,
  	LETTER_GUESS_STATES,
  	TRY_COUNT
  } from '$lib/utils/constants';

  // for dev/testing
  let showAnswerKey: boolean = true;
  let revealAnswer: boolean = false;

  let input;
  let loading: boolean = false;
  let gameState: GAME_STATES = GAME_STATES.inactive;
  let currentTry: number = 0;
  let showOverlay: boolean = false;
  let showSummary: boolean = false;

  $: disabled = gameState !== GAME_STATES.active;
  $: message =
  	gameState === GAME_STATES.won
  		? `CONGRATS! 🎉`
  		: `Sorry, the answer was ${$answer.toUpperCase()}.`;

  onMount(() => {
  	window.addEventListener('keyup', handleKeyPress);

  	return () => {
  		window.removeEventListener('keyup', handleKeyPress);
  	};
  });

  const updateCurrentTry = (i: number) => {
  	currentTry = i;
  };

  const resetGame = () => {
  	answer.set('');
  	guess.set('');
  	gameState = GAME_STATES.inactive;
  	currentTry = 0;
  	validations.set([]);
  	validationsMap.set({});
  	showOverlay = false;
  	showSummary = false;
  	revealAnswer = false;
  };

  const handleGameStart = async () => {
  	resetGame();
  	loading = true;
  	answer.set(await getWord());

  	if (!$answer || typeof $answer !== 'string') {
  		alert(`❗ Uh-oh! We couln't start your game. Try starting again.`);
  		loading = false;
  		return;
  	}

  	gameState = GAME_STATES.active;
  	loading = false;
  };

  const handleWinningEvent = async () => {
  	gameState = GAME_STATES.won;
  	await tick();
  	showOverlay = true;
  	showSummary = true;
  };

  const handleLosingEvent = async () => {
  	gameState = GAME_STATES.lost;
  	await tick();
  	showOverlay = true;
  	showSummary = true;
  };

  const handleKeyPress = e => {
  	if (!disabled) {
  		const regex = /^[a-zA-Z]/;
  		let pressedKey;

  		if (e.code === 'Backspace') {
  			guess.update(g => g.slice(0, -1));
  		}

  		if (['Enter', 'NumpadEnter'].includes(e.code)) {
  			handleGuess();
  		}

  		if ($guess.length >= LETTER_COUNT) return;

  		if (window.event) {
  			pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
  		} else if (e.which) {
  			pressedKey = String.fromCharCode(e.which).toLowerCase();
  		}

  		if (regex.test(pressedKey)) {
  			guess.update(g => g + pressedKey);
  		}
  	}
  };

  export const handleGuess = async () => {
  	if (!disabled) {
  		if ($guess.length < LETTER_COUNT) {
  			alert(`Your guess should probably be ${LETTER_COUNT} letters long. 😉`);
  			return;
  		}

  		if (!(await checkWord($guess))) {
  			alert(`Not in word list. 🤦‍♂️`);
  			return;
  		}

  		validations.update(v => [...v, validateGuess($guess, $answer)]);

  		// You won! End the game early.
  		if (
  			$validations[currentTry].every(
  				({ state }) => state === LETTER_GUESS_STATES.correct
  			)
  		) {
  			await handleWinningEvent();
  		}

  		guess.set('');
  		updateCurrentTry(currentTry + 1);

  		// You lost
  		if (currentTry === TRY_COUNT) {
  			await handleLosingEvent();
  		}
  	}
  };
</script>

<style lang="scss">
  * {
  	box-sizing: border-box;
  }

  main {
  	font-family: sans-serif;
  	margin: 0 auto;
  	max-width: 32rem;
  	padding: 1rem;
  	text-align: center;
  }

  h1 {
  	margin: 0 0 2rem 0;

  	small {
  		font-weight: 400;
  		font-size: 0.5em;
  		vertical-align: 0.6em;
  	}
  }

  h2 {
  	margin-top: 0;
  }

  h3 {
  	color: rgb(175, 175, 175);
  	font-size: 1em;
  	font-variant-caps: all-small-caps;
  	font-weight: 300;
  	letter-spacing: 0.05em;

  	span {
  		font-style: italic;
  		letter-spacing: 0.2em;
  	}
  }

  p {
  	line-height: 1.5em;
  	margin: 0 0 1.5em 0;
  }

  code {
  	color: slategrey;
  	font-family: 'Roboto Mono', monospace;
  	padding: 0 0.2em;
  }

  label {
  	vertical-align: center;
  }

  .overlay {
  	background: rgba(0, 0, 0, 0.2);
  	bottom: 0;
  	height: 100%;
  	left: 0;
  	pointer-events: none;
  	position: fixed;
  	right: 0;
  	top: 0;
  	width: 100%;
  	z-index: 999;
  }

  .summary {
  	background: white;
  	border-radius: 0.2rem;
  	box-sizing: border-box;
  	margin: 0 auto 2rem auto;
  	padding: 2rem;
  	position: relative;
  	width: 100%;
  	z-index: 1000;
  }
</style>

<main>
  <h1>📖 WordGame<small>™️</small></h1>

  {#if disabled}
    <div class="summary">
      {#if showSummary}
        <h2>{ message }</h2>
        <GameSummary validations={$validations} />
      {/if}

      <Button {loading} on:click={handleGameStart}>
        {loading ? "Starting New Game..." : "Start New Game"}
      </Button>
    </div>
  {/if}

  {#if $answer && typeof $answer === 'string'}
    <KeyLegend />
    <p>Using your keyboard, type out your word one guess at a time. When you&rsquo;re ready to guess, just hit <code>ENTER</code> to submit your guess!</p>

    {#each Array(TRY_COUNT) as _, i}
      <WordRow
        disabled={disabled || currentTry !== i || $validations.length !== i}
        tryIndex={i}
        />
    {/each}

    {#if showAnswerKey}
      <h3>
        <label>
          <input name="answerKey" type="checkbox" bind:checked={revealAnswer} />
          Show Answer: <span>{revealAnswer ? $answer.toUpperCase() : '*****'}</span>
        </label>
      </h3>
    {/if}

    {#if showOverlay}
      <div class="overlay"></div>
    {/if}
  {/if}
</main>
