
export interface FlashcardDeck {
    id: number;
    name: string;
    dayLimit: number;
    newFlashcardsToday: number;
    dateCreated: Date;
    lastUpdated: Date;
}