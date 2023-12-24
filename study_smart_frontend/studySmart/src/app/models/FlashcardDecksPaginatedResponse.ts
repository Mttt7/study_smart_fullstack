
import { FlashcardDeck } from "./FlashcardDeck";

export interface FlashcardDecksPaginatedResponse {
    content: FlashcardDeck[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    }
    totalElements: number;
    totalPages: number;
    last: boolean;
}