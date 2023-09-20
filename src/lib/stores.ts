import { writable, type Writable } from 'svelte/store'
import { newBoard, type Board, type Troop } from './chess'

export const loading = writable(false)
export const board = writable({} as Board)
export const heldTroop: Writable<Troop | undefined> = writable(undefined)

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
