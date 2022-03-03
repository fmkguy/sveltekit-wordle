// from https://github.com/tabatkins/wordle-list
const wordsListUrl: string = `https://raw.githubusercontent.com/tabatkins/wordle-list/main/words`;

// list comes sorted and re-sorted by @tabatkins on github
const getWordList = async () => {
	return await fetch(wordsListUrl)
		.then((res) => res.text())
		.then((data) => data.split(/\r?\n/))
		.catch((err) => console.error(err));
};

export const getWord = async () => {
	const list = await getWordList();
	const selectedWordIndex = Math.floor(Math.random() * list.length) || 0;
	return list[selectedWordIndex];
};

export const checkWord = async (word: string) => {
	const list = await getWordList();
	return !!list.find((n) => n === word);
};
