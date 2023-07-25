import type { DictionaryEntry } from "$lib/dictionary";

const dictionaryHistory: DictionaryEntry[] = [];

export const getDictionaryHistory = () => {
    return dictionaryHistory;
}

export const addDictionaryHistory = (entry: DictionaryEntry[]) => {
    dictionaryHistory.push(...entry);
}

export const clearDictionaryHistory = () => {
    dictionaryHistory.splice(0, dictionaryHistory.length);
}

export const removeDictionaryHistory = (entry: DictionaryEntry) => {
    const index = dictionaryHistory.indexOf(entry);
    if (index > -1) {
        dictionaryHistory.splice(index, 1);
    }
}

