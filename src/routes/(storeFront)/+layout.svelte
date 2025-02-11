<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<!-- Header component -->
<Header />
{@render children()}
