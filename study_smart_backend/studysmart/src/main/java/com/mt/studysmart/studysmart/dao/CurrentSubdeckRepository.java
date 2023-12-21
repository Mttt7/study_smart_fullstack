package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrentSubdeckRepository extends JpaRepository<CurrentSubdeck,Long> {
    CurrentSubdeck findByFlashcardDeckId(Long deckId);



}
