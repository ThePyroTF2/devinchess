import { writable, type Writable } from 'svelte/store'
import { newBoard, validMoves, type Board, type Troop, type Square } from './chess'

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

let board_value: Board
board.subscribe((value) => (board_value = value))
export const validSquares = writable([] as Square[])

heldTroop.subscribe(async (troop) => {
	if (troop) {
		validSquares.set(await validMoves(troop, board_value))
	} else {
		validSquares.set([])
	}
})
