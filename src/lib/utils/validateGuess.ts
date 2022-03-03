import { LETTER_GUESS_STATES } from '$lib/utils/constants';
import { validationsMap } from '$lib/stores/store';

interface validationType {
	letter: string;
	state: LETTER_GUESS_STATES;
}

export default function validateGuess(
	guess: String,
	answer: String
): Array<any> {
	let validation: validationType[] = [];
	const guessArr = guess.split('');
	const answerArr = answer.split('');

	const answerLettersCountMap = answerArr.reduce((map, letter) => {
		map[letter] = (map[letter] || 0) + 1;
		return map;
	}, {});

	const guessMap = guessArr.reduce((guesses, letter, i) => {
		if (!guesses[letter]) {
			guesses[letter] = {
				count: 1,
				present: !!answerLettersCountMap[letter],
				presentIndices: [i],
				correctIndices: []
			};
		} else {
			guesses[letter].count = guesses[letter].count + 1;
			guesses[letter].presentIndices.push(i);
		}
		if (letter === answer[i]) {
			guesses[letter].correctIndices.push(i);
		}
		return guesses;
	}, {});

	guessArr.forEach((letter, i) => {
		// default state: letter not present in word
		let state = LETTER_GUESS_STATES.notPresent;
		const guessedLetter = guessMap[letter];

		if (guessedLetter.present) {
			// present but in wrong position
			// * should only change state for first found instance
			// * if > 1 instance in guess but only 1 instance in answer
			//    and second instance is CORRECT, mark "notPresent"
			if (letter !== answer[i]) {
				state = LETTER_GUESS_STATES.present;
			}
			// CORRECT!
			if (letter === answer[i]) {
				state = LETTER_GUESS_STATES.correct;
			}
		}

		// update map of all letter states for "legend"
		// to track which letters have been tried
		validationsMap.update((v) => {
			const entry = v[letter] || { letter };
			// overide with newest state
			entry.state = state;
			return { ...v, [letter]: entry };
		});

		validation.push({ letter, state });
	});

	return validation;
}
