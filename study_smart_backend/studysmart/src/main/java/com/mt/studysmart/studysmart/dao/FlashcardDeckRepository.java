package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardDeckRepository extends JpaRepository<FlashcardDeck,Long> {
}
