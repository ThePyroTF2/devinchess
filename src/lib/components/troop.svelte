<script lang="ts">
	import { displayTroop, type Troop } from '$lib/chess'

	export let troop: Troop | undefined
</script>

<div class="troop">
	{troop?.piece ? displayTroop(troop.piece, troop.color) : ''}
</div>

<style>
	@font-face {
		font-family: 'GNU Unifont';
		src: url('../unifont-15.0.01.otf') format('OpenType');
	}

	.troop {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'GNU Unifont';
		font-size: 100px;
		user-select: none;
		-webkit-user-select: none;
	}
</style>
