import { writable, type Writable } from 'svelte/store'
import { newBoard, type Board } from './chess'

export function getBoard(): [Writable<Board>, Writable<boolean>] {
	const loading = writable(false)
	const board = writable({} as Board)

	async function load() {
		loading.set(true)
		board.set({} as Board)

		board.set(await newBoard())

		loading.set(false)
	}

	load()

	return [board, loading]
}
