<script>
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import '../app.postcss';
</script>

<section class="py-5">
	<header class="w-5/6 mx-auto my-10 flex items-center justify-between">
		<span class="material-symbols-outlined"> library_books </span>
		<ThemeSwitch />
	</header>
	<main class="w-5/6 mx-auto">
		<slot />
	</main>
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
	}
</style>
