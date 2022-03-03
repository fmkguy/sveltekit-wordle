export enum GAME_STATES {
	inactive, // initial blank state
	active, // game has started
	lost, // game over
	won // game over but happy about it
}

export enum LETTER_GUESS_STATES {
	present = 'present', // in the word but not in the right place
	correct = 'correct', // perfect!
	notPresent = 'not-present' // not found in the word
}

export const TRY_COUNT = 6;

export const LETTER_COUNT = 5;
