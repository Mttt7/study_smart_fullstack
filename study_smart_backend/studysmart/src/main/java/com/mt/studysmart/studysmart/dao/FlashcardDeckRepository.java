package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardDeckRepository extends JpaRepository<FlashcardDeck,Long> {
    List<FlashcardDeck> findAllByUserProfile_IdOrderByLastUpdatedDesc(Long id);



}
