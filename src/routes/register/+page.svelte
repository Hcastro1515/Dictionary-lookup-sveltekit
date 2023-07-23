<script lang="ts">
	import type { PageData } from './$types';
	import {z} from 'zod';
	import {superForm} from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data: PageData;

	const newUserSchema = z.object({
		email: z.string().email(),
		username: z.string().min(3).max(20),
		password: z.string().min(8).max(100),
		confirmPassword: z.string().min(8).max(100)
	});

	const {form, errors, enhance, constraints} = superForm(data.form,{
		taintedMessage: "Are you sure you want to leave this page?",
		validators: newUserSchema
	});
</script>

<div class="my-10 w-1/3 mx-auto">
	<h1 class="text-2xl font-bold mb-5">Register</h1>
	<form action="?/register" method="POST" use:enhance>
		<label for="username">Username</label>
		<input type="text" name="username" id="username" placeholder="Username" required />
		{#if $errors.username}
			<p class="text-red-500">{$errors.username}</p>
		{/if}
		<label for="email">Email</label>
		<input type="email" name="email" id="email" placeholder="Email" required />
		{#if $errors.email}
			<p class="text-red-500">{$errors.email}</p>
		{/if}
		<label for="password">Password</label>
		<input type="password" name="password" id="password" placeholder="Password" required />
		{#if $errors.password}
			<p class="text-red-500">{$errors.password}</p>
		{/if}
		<label for="password">Confirm Password</label>
		<input
			type="password"
			name="confirmPassword"
			id="password"
			placeholder="Confirm Password"
			required
		/>
		{#if $errors.confirmPassword}
			<p class="text-red-500">{$errors.confirmPassword}</p>
		{/if}
		<button type="submit">Register</button>
	</form>
</div>
