package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile,Long> {
    //UserProfile findByEmail(String email);
}
