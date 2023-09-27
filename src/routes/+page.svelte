<script lang="ts">
	import Square from '$lib/components/square.svelte'
	import Troop from '$lib/components/troop.svelte'
	import { numberToFile, numberToRank, newBoard, type Board } from '$lib/chess'
	import { getBoard } from '$lib/stores'

	const [board, loading] = getBoard()
	let board_value: Board
	let loading_value: boolean

	board.subscribe((value) => (board_value = value))
	loading.subscribe((value) => (loading_value = value))
</script>

{#if loading_value}
	Loading...
{:else}
	<div class="row center page">
		<div class="column center">
			{#each [...Array(8).keys()] as y}
				<div class="row">
					{#each [...Array(8).keys()] as x}
						<Square
							dark={(x + y) % 2 === 1}
							position={{ file: numberToFile(x), rank: numberToRank(7 - y) }}
						>
							<Troop troop={board_value.squares[numberToFile(x)][numberToRank(7 - y)].troop} />
						</Square>
					{/each}
				</div>
			{/each}
			<button
				class="reset"
				on:click={async () => board.set(await newBoard())}
				style:font-family="GNU Unifont">Reset</button
			>
		</div>
	</div>
{/if}

<style>
	.row {
		display: flex;
		flex-direction: row;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	.center {
		align-items: center;
		justify-content: center;
	}
	.page {
		height: 100vh;
	}

	@media only screen and (max-width: 649px) {
		.reset {
			font-size: 5.2vw;
			margin: 1.4vw;
		}
	}
	@media only screen and (min-width: 650px) {
		.reset {
			font-size: 35px;
			margin: 8px;
		}
	}
</style>
