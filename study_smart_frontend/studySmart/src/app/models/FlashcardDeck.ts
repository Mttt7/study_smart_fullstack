
export interface FlashcardDeck {
    id: number;
    name: string;
    dayLimit: number;
    reviewedToday: number;
    dateCreated: Date;
    lastUpdated: Date;
}