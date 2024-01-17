package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.FlashcardDeckRepository;
import com.mt.studysmart.studysmart.dao.UserProfileRepository;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import com.mt.studysmart.studysmart.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final FlashcardDeckRepository flashcardDeckRepository;

    @Override
    public UserProfile getUserProfileById(Long id) {
        return userProfileRepository.findById(id).orElse(null);
    }
    @Override
    public List<FlashcardDeck> getDecksByUserId(Long id) {
        return flashcardDeckRepository.findAllByUserProfile_IdOrderByLastUpdatedDesc(id);
    }
    @Override
    public Page<FlashcardDeck> getDecksByUserIdWithPagination(Long id, Pageable pageable) {
        return flashcardDeckRepository.findAllByUserProfile_IdOrderByLastUpdatedDesc(id, pageable);
    }

    @Override
    public Long getIdByOktaId(String oktaId) {
        UserProfile userProfile =  userProfileRepository.findByOktaId(oktaId);
        if(userProfile == null){
            userProfile = new UserProfile();
            userProfile.setOktaId(oktaId);
            userProfileRepository.save(userProfile);
        }
        return userProfile.getId();

    }

    @Override
    public Page<FlashcardDeck> searchDecksByUserIdWithPagination(Long id, Pageable pageable, String keyword) {
        return flashcardDeckRepository.findAllByUserProfile_IdAndNameContaining(id,keyword,pageable);
    }

    @Override
    public int getDecksCountByUserId(Long id) {
       return flashcardDeckRepository.countByUserProfile_Id(id);
    }

    @Override
    public Long getFlashcardsCountByUserId(Long id) {
       List<FlashcardDeck> tempDecks =  this.getDecksByUserId(id);
       long flashcardCount = 0L;
        for (FlashcardDeck f :
                tempDecks) {
            flashcardCount = flashcardCount+f.getFlashcardsCount();
        }
        return flashcardCount;
    }


}
