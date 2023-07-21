<script lang="ts">
	import type { DictionaryEntry } from '$lib/dictionary';
	export const definition: DictionaryEntry[] | null = [];
	console.log(definition);
</script>

<section>
	{#if definition.length > 0}
		{#each definition as entry}
			<div class="bg-gray-400 rounded-lg p-4 mb-4">
				<h2 class="text-2xl font-bold mb-2">{entry.word}</h2>
				{#each entry.meanings as meaning}
					<div class="mb-4">
						<h3 class="text-xl font-bold mb-2">{meaning.partOfSpeech}</h3>
						{#each meaning.definitions as definition}
							<div class="mb-2">
								<p class="text-lg font-bold mb-1">{definition.definition}</p>
								{#if definition.example}
									<p class="text-gray-600 italic">"{definition.example}"</p>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	{:else if definition.length < 0}
		<p class="text-xl font-bold mb-2">No definition found for the word.</p>
	{/if}
</section>
