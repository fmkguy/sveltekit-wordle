import { writable } from 'svelte/store';

export const validations = writable([]);
export const validationsMap = writable({});
export const guess = writable('');
export const answer = writable('');
