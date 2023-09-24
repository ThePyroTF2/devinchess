<script lang="ts">
	import { page } from '$app/stores'
	export let title: string
	export let description: string
	export let image = `${$page.url.origin}/favicon.png`
	export let titleSuffix = 'Devinchess'
	const titleWithSuffix = titleSuffix === title ? title : `${title} | ${titleSuffix}`
</script>

<svelte:head>
	<!-- Search engines -->
	<title>{titleWithSuffix}</title>
	<meta name="title" content={titleWithSuffix} />
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={titleWithSuffix} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content={titleWithSuffix} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
