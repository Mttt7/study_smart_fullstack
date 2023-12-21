package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard,Long> {
    List<Flashcard> findAllByFlashcardDeck_Id(Long id);

    List<Flashcard> findAllByCurrentSubdeck_Id(Long id);

//    @Query(value = "SELECT f FROM Flashcard f ORDER BY f.score ASC")
//    List<Flashcard> findFlashcardsWithLowestScore(@Param("limit") int limit);


    void removeById(Long id);

    Long countByFlashcardDeckId(Long deckId);

    Flashcard findFirstFlashcardByScoreAndPreviousScoreAndCurrentSubdeckIsNull(int score, int previousScore);

}
