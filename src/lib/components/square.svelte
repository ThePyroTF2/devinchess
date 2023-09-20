<script lang="ts">
	import { type Position, type Troop, moveTroop, type Board } from '$lib/chess'
	import { heldTroop, board } from '$lib/stores'

	let heldTroop_value: Troop | undefined
	let board_value: Board

	heldTroop.subscribe((value) => (heldTroop_value = value))
	board.subscribe((value) => (board_value = value))

	export let dark = false
	export let position: Position
</script>

<div
	role="button"
	tabindex={heldTroop_value ? 0 : undefined}
	class="square"
	style:--color={dark ? 'Green' : 'White'}
	style:cursor={heldTroop_value ? 'pointer' : 'default'}
	on:click={async () => {
		if (
			heldTroop_value &&
			!(
				heldTroop_value.position.file === position.file &&
				heldTroop_value.position.rank === position.rank
			)
		) {
			let new_board
			try {
				new_board = await moveTroop(heldTroop_value.position, position, board_value)
			} catch (e) {
				console.log(e)
				return
			}
			board.set(new_board)
			heldTroop.set(undefined)
		}
	}}
	on:keydown={async (e) => {
		if (e.key === 'Enter' && heldTroop_value) {
			let new_board
			try {
				new_board = await moveTroop(heldTroop_value.position, position, board_value)
			} catch (e) {
				console.log(e)
				return
			}
			board.set(new_board)
			heldTroop.set(undefined)
		}
	}}
>
	<slot />
</div>

<style>
	.square {
		background-color: var(--color);
	}

	@media only screen and (min-width: 650px) {
		.square {
			width: 75px;
			height: 75px;
		}
	}

	@media only screen and (max-width: 649px) {
		.square {
			width: 12vw;
			height: 12vw;
		}
	}
</style>
