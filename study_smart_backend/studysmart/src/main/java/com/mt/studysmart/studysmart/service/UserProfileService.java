package com.mt.studysmart.studysmart.service;


import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;

import java.util.List;

public interface UserProfileService {
   List<FlashcardDeck> getDecksByUserId(Long id);

    UserProfile getUserProfileById(Long id);

}
