<script lang="ts">
	export let dark = false
</script>

<div class="square" style:--color={dark ? 'Green' : 'LightGray'}>
	<slot />
</div>

<style>
	.square {
		width: 100px;
		height: 100px;
		background-color: var(--color);
	}
</style>
