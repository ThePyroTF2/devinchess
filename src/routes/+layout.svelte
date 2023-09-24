<script>
	import Meta from '$lib/components/meta.svelte'
	import { dev } from '$app/environment'
	import { inject } from '@vercel/analytics'

	inject({ mode: dev ? 'development' : 'production' })
</script>

<Meta
	title="Devinchess"
	description="Devinchess again. Sveltekit frontend + Rust backend. Currently WIP"
/>

<slot />
