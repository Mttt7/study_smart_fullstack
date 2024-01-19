package com.mt.studysmart.studysmart.service;

import com.mt.studysmart.studysmart.dto.FlashcardUpdateDto;
import com.mt.studysmart.studysmart.entity.Flashcard;

import java.util.List;

public interface FlashcardService {

    Flashcard save(Flashcard flashcard);
    Flashcard findById(Long id);

    Flashcard updateFlashcard(FlashcardUpdateDto flashcardUpdateDto);

    List<Flashcard> findBySubdeckId(Long id);

    List<Flashcard> populateSubdeck(int limit, Long deckId);
    void removeById(Long id);

   Long countByFlashcardDeckId(Long id);

   List<Flashcard> findAllByFlashcardDeck_Id(Long id);

    Flashcard addScore(Long id, int score);

    public Flashcard findPristineFlashcardFromDeckId(Long deckId);

}
