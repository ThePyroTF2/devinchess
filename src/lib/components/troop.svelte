<script lang="ts">
	import { displayTroop, type Board, type Troop, cmpTroops } from '$lib/chess'
	import { board, heldTroop } from '$lib/stores'

	let board_value: Board
	let heldTroop_value: Troop | undefined

	board.subscribe((value) => (board_value = value))
	heldTroop.subscribe((value) => (heldTroop_value = value))

	export let troop: Troop | undefined

	//@ts-ignore
	$: canMove = board_value.state.ToMove === troop?.color

	$: held = cmpTroops(heldTroop_value, troop)
</script>

<div class="troop">
	<div
		tabindex={canMove ? 0 : undefined}
		role="button"
		style:cursor={canMove || heldTroop_value ? 'pointer' : 'default'}
		on:click={() => {
			if (canMove) {
				heldTroop.set(troop)
			}
		}}
		on:keydown={(e) => {
			if ((e.key === 'Enter' || e.key === ' ') && canMove) {
				heldTroop.set(troop)
			}
		}}
		class:held
	>
		{troop?.piece ? displayTroop(troop.piece, troop.color) : ''}
	</div>
</div>

<style>
	@font-face {
		font-family: 'GNU Unifont';
		src: url('$lib/unifont-15.0.01.otf') format('OpenType');
	}

	.troop {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'GNU Unifont';
		user-select: none;
		-webkit-user-select: none;
	}

	.held {
		opacity: 50%;
		animation-name: wobble;
		animation-iteration-count: infinite;
		animation-duration: 0.3s;
		transition: ease 0.3s;
	}

	@media only screen and (min-width: 650px) {
		.held {
			font-size: 100px;
		}

		.troop {
			font-size: 87px;
		}

		@keyframes wobble {
			0% {
				transform: rotate(-5deg) translateY(-5px);
			}
			50% {
				transform: rotate(5deg) translateY(-5px);
			}
			100% {
				transform: rotate(-5deg) translateY(-5px);
			}
		}
	}

	@media only screen and (max-width: 649px) {
		.held {
			font-size: 15vw;
		}

		.troop {
			font-size: 13vw;
		}

		@keyframes wobble {
			0% {
				transform: rotate(-5deg) translateY(-0.77vw);
			}
			50% {
				transform: rotate(5deg) translateY(-0.77vw);
			}
			100% {
				transform: rotate(-5deg) translateY(-0.77vw);
			}
		}
	}
</style>
