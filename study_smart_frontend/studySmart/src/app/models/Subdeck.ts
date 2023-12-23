import { Flashcard } from "./Flashcard";

export interface Subdeck {
    id: number;
    size: number;
    Flashcards?: Flashcard[];
}