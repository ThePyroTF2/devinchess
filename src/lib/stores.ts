import { writable, type Writable } from 'svelte/store'
import { newBoard, type Board } from './chess'

export const loading = writable(false)
export const board = writable({} as Board)

export function getBoard(): [Writable<Board>, Writable<boolean>] {
	async function load() {
		loading.set(true)
		board.set({} as Board)

		board.set(await newBoard())

		loading.set(false)
	}

	load()

	return [board, loading]
}
