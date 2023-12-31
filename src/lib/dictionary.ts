export interface DictionaryEntry {
	word: string;
	phonetic: string;
	phonetics: Phonetic[];
	origin: string;
	meanings: Meaning[];
	sourceUrls: string[]; 
}

export interface Phonetic {
	text: string;
	audio?: string;
}

export interface Meaning {
	partOfSpeech: string;
	definitions: Definition[];
	synonyms: string[];
}

export interface Definition {
	definition: string;
	example: string;
	synonyms: any[];
	antonyms: any[];
}

