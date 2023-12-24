package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile,Long> {
    Page<FlashcardDeck> findById(Long id, Pageable pageable);



    //UserProfile findByEmail(String email);
}
