<script lang="ts">
	export let dark = false
</script>

<div class="square" style:--color={dark ? 'Green' : 'LightGray'}>
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
