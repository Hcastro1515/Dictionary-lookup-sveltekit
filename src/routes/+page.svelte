<script lang="ts">
	import axios from 'axios';
	import type { DictionaryEntry } from '$lib/dictionary';
	import type { AxiosResponse } from 'axios';
	import { onMount } from 'svelte';
	import Customhr from '../components/customhr.svelte';

	let word: string = '';
	let dictionaryEntry: DictionaryEntry[] | null = null;
	let isLoading: boolean = false;
	let error: string = '';

	const getWordDefinition = async () => {
		try {
			const response: AxiosResponse<DictionaryEntry[]> = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
			);
			const responseData: DictionaryEntry[] = response.data;

			if (Array.isArray(responseData) && responseData.length > 0) {
				dictionaryEntry = responseData;
				window.localStorage.setItem('dictionaryEntry', JSON.stringify(dictionaryEntry));
			} else {
				dictionaryEntry = null;
				error = 'No definition found for the word.';
			}
		} catch (error: any) {
			if (error.response && error.response.status === 404) {
				dictionaryEntry = null;
				error = 'Word not found in the dictionary.';
			} else {
				console.error(error);
				dictionaryEntry = null;
				error = 'An error occurred while fetching the definition.';
			}
		}
	};

	onMount(() => {
		const cachedResult = window.localStorage.getItem('dictionaryEntry');
		if (cachedResult) {
			dictionaryEntry = JSON.parse(cachedResult);
		}
	});
</script>

<section>
	<form action="" on:submit|preventDefault={getWordDefinition}>
		<div class="bg-gray-400 flex justify-between items-center rounded-lg relative">
			<input
				class="w-full p-4 bg-gray-300 font-bold dark:bg-slate-600 dark:placeholder:text-white rounded-lg outline-purple-500 pr-10"
				type="search"
				placeholder="Enter a word to search...."
				name="word"
				autocorrect="on"
				bind:value={word}
			/>
			<span
				class="text-purple-500 material-symbols-outlined absolute ml-4 right-3 top-1/2 transform -translate-y-1/2"
				>search</span
			>
		</div>
	</form>

	<div class="mt-9">
		{#if dictionaryEntry}
			{#each dictionaryEntry as entry}
				<h1 class="text-5xl font-semibold first-letter:uppercase">{entry.word}</h1>
				<p class="text-purple-500 mt-4 font-semibold">{entry.phonetic}</p>

				{#each entry.meanings as meanings}
					<Customhr word={meanings.partOfSpeech} />
					<div class="mt-8">
						<h5 class="font-light text-gray-800 dark:text-white mb-3">Meaning</h5>
						<ul class="list-inside list-disc ml-5 w-10/12 space-y-2">
							{#each meanings.definitions as definitions}
								<li class="text-clip">{definitions.definition}</li>
							{/each}
						</ul>

						<p class="font-light text-gray-800 dark:text-white mb-3 mt-10">
							Synonyms
							{#if meanings.synonyms}
								<span class="text-purple-500 ml-10 first-letter:uppercase font-semibold">{meanings.synonyms}</span
								>
							{/if}
						</p>
					</div>
				{/each}

				{#each entry.sourceUrls as source}
					<div class="mt-5">
						<hr />
						<p class="font-light text-gray-800 dark:text-white mb-3">Source <a href={source} target="_blank" class="ml-10 underline text-purple-500 font-semibold">${source}</a></p>
					</div>
				{/each}
			{/each}
		{/if}
	</div>
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
	}
</style>
