import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import type { CanvasOptions } from './types';

const CANVAS_OPTIONS_KEY = 'canvasOptions';

// Create a writable store and set it in context
export const setCanvasOptions = (options: CanvasOptions) => {
	const store = writable(options);
	setContext(CANVAS_OPTIONS_KEY, store);
	return store;
};

// Retrieve the writable store from context
export const getCanvasOptions = () => {
	return getContext<typeof writable<CanvasOptions>>(CANVAS_OPTIONS_KEY);
};
