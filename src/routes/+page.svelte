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
	let audioElement: HTMLAudioElement | null = null;
	let isPlaying: boolean = false;

	const playAudio = () => {
		if (audioElement) {
			audioElement.play();
			isPlaying = true;
		}
	};

	const pauseAudio = () => {
		if (audioElement) {
			audioElement.pause();
			isPlaying = false;
		}
	};

	const getWordDefinition = async () => {
		isLoading = true;
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
		} finally {
			isLoading = false;
		}
	};

	// Listen for the audio 'ended' event to reset the button state when the audio finishes playing.
	const handleAudioEnded = () => {
		isPlaying = false;
	};

	onMount(() => {
		// Add an event listener for the 'ended' event of the audio element.
		if (audioElement) {
			audioElement.addEventListener('ended', handleAudioEnded);
		}

		const cachedResult = window.localStorage.getItem('dictionaryEntry');
		if (cachedResult) {
			dictionaryEntry = JSON.parse(cachedResult);
		}
	});
</script>

<section>
	<header class=" mx-auto my-10 flex items-center justify-between">
		<span class="material-symbols-outlined"> library_books </span>
	</header>
	<form action="" on:submit|preventDefault={getWordDefinition}>
		<div class="bg-gray-400 flex justify-between items-center rounded-lg relative">
			<input
				tabindex="0"
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

	{#if isLoading}
		<p>Loading</p>
	{:else if error}
		<p>Thre was an error with your search!</p>
	{:else}
		<div class="mt-9 relative">
			{#if dictionaryEntry}
				{#each dictionaryEntry as entry}
					{#if entry.phonetics[0].audio}
						<div
							class="absolute right-3 top-3 bg-purple-300 grid place-items-center p-5 rounded-full cursor-pointer"
						>
							{#if isPlaying}
								<span
									class="material-symbols-outlined"
									role="button"
									tabindex="1"
									aria-label="Pause audio"
									on:click={pauseAudio}
									on:keydown={(event) => event.key === 'Enter' && pauseAudio()}
								>
									pause
								</span>
							{:else}
								<span
									role="button"
									on:click={playAudio}
									tabindex="0"
									on:keydown={(event) => event.key === 'Enter' && playAudio()}
									aria-label="word definition"
									class="material-symbols-outlined"
								>
									play_arrow
								</span>
							{/if}
							<audio bind:this={audioElement}>
								<source src={entry.phonetics[0].audio} />
							</audio>
						</div>
					{/if}
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
									<span class="text-purple-500 ml-10 first-letter:uppercase font-semibold"
										>{meanings.synonyms}</span
									>
								{/if}
							</p>
						</div>
					{/each}

					{#each entry.sourceUrls as source}
						<div class="mt-5">
							<hr />
							<p class="font-light text-gray-800 dark:text-white mb-3">
								Source <a
									href={source}
									target="_blank"
									class="ml-10 underline text-purple-500 font-semibold">${source}</a
								>
							</p>
						</div>
					{/each}
				{/each}
			{/if}
		</div>
	{/if}
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
	}
</style>
