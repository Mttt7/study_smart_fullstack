package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.Flashcard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard,Long> {

    List<Flashcard> findAllByFlashcardDeck_Id(Long id);

    List<Flashcard> findAllByFlashcardDeck_IdAndAndStatus(Long id,int status);

    Page<Flashcard> findAllByFlashcardDeck_Id(Long id, Pageable pageable);

    List<Flashcard> findAllByCurrentSubdeck_IdAndCurrentSubdeckNotNull(Long id);

    void removeById(Long id);

    Long countByFlashcardDeckId(Long deckId);

    Flashcard findFirstByFlashcardDeck_IdAndStatus(Long deckId,int status);
}
