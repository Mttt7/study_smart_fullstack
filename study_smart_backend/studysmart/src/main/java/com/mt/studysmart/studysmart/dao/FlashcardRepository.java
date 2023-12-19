package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardRepository extends JpaRepository<Flashcard,Long> {
}
