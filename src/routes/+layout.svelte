<script>
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import '../app.postcss';
</script>

<section class="py-5">
	<main class="w-5/6 mx-auto">
		<slot />
	</main>
</section>
