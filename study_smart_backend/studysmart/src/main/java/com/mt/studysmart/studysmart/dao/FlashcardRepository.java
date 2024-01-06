package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.Flashcard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard,Long> {

    List<Flashcard> findAllByFlashcardDeck_Id(Long id);

    Page<Flashcard> findAllByFlashcardDeck_Id(Long id, Pageable pageable);

    List<Flashcard> findAllByCurrentSubdeck_IdAndCurrentSubdeckNotNull(Long id);

//    @Query(value = "SELECT f FROM Flashcard f ORDER BY f.score ASC")
//    List<Flashcard> findFlashcardsWithLowestScore(@Param("limit") int limit);


    void removeById(Long id);

    Long countByFlashcardDeckId(Long deckId);


    Flashcard findFirstByFlashcardDeck_IdAndStatus(Long deckId,int status);


}
