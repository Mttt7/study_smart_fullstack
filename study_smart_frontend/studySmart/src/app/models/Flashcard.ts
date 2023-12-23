import { Subdeck } from "./Subdeck";

export interface Flashcard {
    id: number;
    frontContent: string;
    backContent: string;
    dateCreated: Date;
    lastUpdated: Date;
    currentSubdeck: Subdeck;
    score: number;
    previousScore: number;
    status: number;
}