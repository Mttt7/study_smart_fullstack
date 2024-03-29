package com.mt.studysmart.studysmart.service;

import com.mt.studysmart.studysmart.dto.AddFlashcardPayload;
import com.mt.studysmart.studysmart.dto.FlashcardDeckCreateDto;
import com.mt.studysmart.studysmart.dto.NewNameDto;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FlashcardDeckService {

    void save(FlashcardDeck flashcardDeck);
    FlashcardDeck findById(Long id);

    List<Flashcard> findFlashcardsByDeckId(Long id);

    List<Flashcard> findGreenFlashcardsByDeckId(Long id);

    Flashcard addFlashcardToDeck(Long id, AddFlashcardPayload flashcardPayload);

    FlashcardDeck createFlashcardDeck(FlashcardDeckCreateDto flashcardDeckCreateDto);

    void deleteFlashcardDeck(Long deckId);

    FlashcardDeck ChangeFlashcardDeckName(Long deckId, NewNameDto name);

    Page<Flashcard> findFlashcardsByDeckIdWithPagination(Long deckId, Pageable pageable);

    FlashcardDeck changeDayLimit(Long deckId, Long dayLimit);

    List<Flashcard> resetScore(Long deckId,String type);
}
