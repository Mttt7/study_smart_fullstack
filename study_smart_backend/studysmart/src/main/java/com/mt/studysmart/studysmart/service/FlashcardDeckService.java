package com.mt.studysmart.studysmart.service;

import com.mt.studysmart.studysmart.dto.FlashcardDeckCreateDto;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;

import java.util.List;

public interface FlashcardDeckService {

    FlashcardDeck findById(Long id);

    List<Flashcard> findFlashcardsByDeckId(Long id);

    Flashcard addFlashcardToDeck(Long id, Flashcard flashcard);

    FlashcardDeck createFlashcardDeck(FlashcardDeckCreateDto flashcardDeckCreateDto);

}
