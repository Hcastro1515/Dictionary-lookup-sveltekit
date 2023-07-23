<script>
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import '../app.postcss';
</script>

<section class="py-5">
	<nav class="text-center my-3">
		<small
			><a class="text-purple-800 font-semibold underline cursor-pointer" href="/register">Register,</a
			> and keep track of your dictionary findings</small
		>
		<a class="bg-purple-500 text-white py-1 px-3 rounded-lg ml-2" href="/login">
			Log in
		</a>
	</nav>
	<main class="w-5/6 mx-auto">
		<slot />
	</main>
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
	}
</style>
