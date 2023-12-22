package com.mt.studysmart.studysmart.service;

import com.mt.studysmart.studysmart.dto.FlashcardDeckCreateDto;
import com.mt.studysmart.studysmart.dto.NewNameDto;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;

import java.util.List;

public interface FlashcardDeckService {

    void save(FlashcardDeck flashcardDeck);
    FlashcardDeck findById(Long id);

    List<Flashcard> findFlashcardsByDeckId(Long id);

    Flashcard addFlashcardToDeck(Long id, Flashcard flashcard);

    FlashcardDeck createFlashcardDeck(FlashcardDeckCreateDto flashcardDeckCreateDto);

    void deleteFlashcardDeck(Long deckId);

    FlashcardDeck ChangeFlashcardDeckName(Long deckId, NewNameDto name);



}
