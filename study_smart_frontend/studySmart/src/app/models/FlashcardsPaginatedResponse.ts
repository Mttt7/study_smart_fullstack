import { Flashcard } from "./Flashcard";

export interface FlashcardsPaginatedResponse {
    content: Flashcard[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    }
    totalElements: number;
    totalPages: number;
    last: boolean;
}