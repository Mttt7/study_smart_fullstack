package com.mt.studysmart.studysmart.service;


import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserProfileService {
   List<FlashcardDeck> getDecksByUserId(Long id);

    UserProfile getUserProfileById(Long id);
    Page<FlashcardDeck> getDecksByUserIdWithPagination(Long id, Pageable pageable);

}
