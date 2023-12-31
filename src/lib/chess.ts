const API_URL = 'https://rust-chess-api-yjy6hxgr2a-uk.a.run.app'
// const API_URL = 'http://127.0.0.1:8000'

export type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
export function fileToNumber(file: File): number {
	switch (file) {
		case 'A':
			return 1
		case 'B':
			return 2
		case 'C':
			return 3
		case 'D':
			return 4
		case 'E':
			return 5
		case 'F':
			return 6
		case 'G':
			return 7
		case 'H':
			return 8
	}
}
export function numberToFile(number: number): File {
	switch (number) {
		case 0:
			return 'A'
		case 1:
			return 'B'
		case 2:
			return 'C'
		case 3:
			return 'D'
		case 4:
			return 'E'
		case 5:
			return 'F'
		case 6:
			return 'G'
		case 7:
			return 'H'
		default:
			throw new Error(`Invalid file number: ${number}`)
	}
}
export type Rank = 'One' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six' | 'Seven' | 'Eight'
export function rankToNumber(rank: Rank): number {
	switch (rank) {
		case 'One':
			return 1
		case 'Two':
			return 2
		case 'Three':
			return 3
		case 'Four':
			return 4
		case 'Five':
			return 5
		case 'Six':
			return 6
		case 'Seven':
			return 7
		case 'Eight':
			return 8
	}
}
export function numberToRank(number: number): Rank {
	switch (number) {
		case 0:
			return 'One'
		case 1:
			return 'Two'
		case 2:
			return 'Three'
		case 3:
			return 'Four'
		case 4:
			return 'Five'
		case 5:
			return 'Six'
		case 6:
			return 'Seven'
		case 7:
			return 'Eight'
		default:
			throw new Error(`Invalid rank number: ${number}`)
	}
}

export type Square = {
	troop?: Troop
	position: Position
}

export type Position = {
	file: File
	rank: Rank
}

export type Troop = {
	piece: Piece
	color: Color
	position: Position
}
export function cmpTroops(left: Troop | undefined, right: Troop | undefined): boolean {
	return (
		left?.piece === right?.piece &&
		left?.color === right?.color &&
		left?.position.file === right?.position.file &&
		left?.position.rank === right?.position.rank
	)
}

export type Piece = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'Queen' | 'King'
export type Color = 'White' | 'Black'

export type BoardState =
	| 'Stalemate'
	| 'Draw'
	| { Checkmate: Color }
	| { Check: Color }
	| { ToMove: Color }

export type Board = {
	squares: { [index in File]: { [index in Rank]: Square } }
	state: BoardState
}

export async function newBoard(): Promise<Board> {
	const response = await fetch(`${API_URL}/new-board`)
	return await response.json()
}

export async function display(board: Board): Promise<string> {
	const response = await fetch(`${API_URL}/display`, {
		method: 'POST',
		body: JSON.stringify(board),
	})
	return await response.text()
}

export async function moveTroop(start: Position, end: Position, board: Board): Promise<Board> {
	const response = await fetch(`${API_URL}/move-troop`, {
		method: 'POST',
		body: JSON.stringify({ start, end, board }),
	})
	if (response.status !== 200) {
		throw new Error(await response.text())
	}

	return await response.json()
}

export function displayTroop(piece: Piece, color: Color) {
	switch (piece) {
		case 'Pawn':
			return color === 'White' ? '♙' : '♟'
		case 'Rook':
			return color === 'White' ? '♖' : '♜'
		case 'Knight':
			return color === 'White' ? '♘' : '♞'
		case 'Bishop':
			return color === 'White' ? '♗' : '♝'
		case 'Queen':
			return color === 'White' ? '♕' : '♛'
		case 'King':
			return color === 'White' ? '♔' : '♚'
	}
}

export async function validMoves(troop: Troop, board: Board): Promise<Square[]> {
	const response = await fetch(`${API_URL}/valid-moves`, {
		method: 'POST',
		body: JSON.stringify({ troop, board }),
	})
	if (response.status !== 200) {
		throw new Error(await response.text())
	}

	return await response.json()
}
