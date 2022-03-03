// from https://github.com/seanpatlan/wordle-words
const wordListUrl: string = `https://raw.githubusercontent.com/seanpatlan/wordle-words/main/word-bank.csv`;
const wordPoolUrl: string = `https://raw.githubusercontent.com/seanpatlan/wordle-words/main/valid-words.csv`;

let list: void | string[]; // choose word from this list
let pool: void | string[]; // check words against this total words pool

(async function main() {
	// list comes sorted and re-sorted by @tabatkins on github
	const getWordList = async () => {
		return await fetch(wordListUrl)
			.then((res) => res.text())
			.then((data) => data.split(/\r?\n/))
			.catch((err) => console.error(err));
	};

	const getWordPool = async () => {
		return await fetch(wordPoolUrl)
			.then((res) => res.text())
			.then((data) => data.split(/\r?\n/))
			.catch((err) => console.error(err));
	};

	list = await getWordList();
	pool = await getWordPool();
})();

export const getWord = () => {
	if (list) {
		const selectedWordIndex = Math.floor(Math.random() * list.length) || 0;
		return list[selectedWordIndex];
	}
};

export const checkWord = (word: string) => {
	if (pool) {
		return !!pool.find((n) => n === word);
	}
};
