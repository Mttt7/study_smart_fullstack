package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.FlashcardDeckRepository;
import com.mt.studysmart.studysmart.dao.FlashcardRepository;
import com.mt.studysmart.studysmart.dto.AddFlashcardPayload;
import com.mt.studysmart.studysmart.dto.FlashcardDeckCreateDto;
import com.mt.studysmart.studysmart.dto.NewNameDto;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import com.mt.studysmart.studysmart.service.FlashcardDeckService;
import com.mt.studysmart.studysmart.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlashcardDeckServiceImpl implements FlashcardDeckService {

    private final FlashcardRepository flashcardRepository; //zmieni na serwis!!!!!
    private final FlashcardDeckRepository flashcardDeckRepository;
    private final UserProfileService userProfileService;


    @Override
    public void save(FlashcardDeck flashcardDeck) {
        flashcardDeckRepository.save(flashcardDeck);
    }

    @Override
    public FlashcardDeck findById(Long id) {
        Optional<FlashcardDeck> result = flashcardDeckRepository.findById(id);

        FlashcardDeck theFlashcardDeck = null;

        if(result.isPresent()) {
            theFlashcardDeck = result.get();
        }else{
            theFlashcardDeck = null;
        }

        return theFlashcardDeck;
    }

    @Override
    public List<Flashcard> findFlashcardsByDeckId(Long id) {
        return flashcardRepository.findAllByFlashcardDeck_Id(id);
    }

    @Override
    public Page<Flashcard> findFlashcardsByDeckIdWithPagination(Long deckId, Pageable pageable) {
        return flashcardRepository.findAllByFlashcardDeck_Id(deckId, pageable);
    }

    @Override
    public Flashcard addFlashcardToDeck(Long id, AddFlashcardPayload flashcardPayload) {
        Flashcard flashcard = new Flashcard();
        flashcard.setFrontContent(flashcardPayload.getFrontContent());
        flashcard.setBackContent(flashcardPayload.getBackContent());
        FlashcardDeck tempFlashcardDeck = this.findById(id);
        flashcard.setFlashcardDeck(tempFlashcardDeck);
        flashcard.setStatus(-1);
        flashcardRepository.save(flashcard);
        return flashcard;
    }

    @Override
    public FlashcardDeck createFlashcardDeck(FlashcardDeckCreateDto flashcardDeckCreateDto) {
        FlashcardDeck flashcardDeck = new FlashcardDeck();
        UserProfile userProfile = userProfileService.getUserProfileById(flashcardDeckCreateDto.getUserProfileId());
        flashcardDeck.setUserProfile(userProfile);
        flashcardDeck.setName(flashcardDeckCreateDto.getName());
        flashcardDeck.setDayLimit(flashcardDeckCreateDto.getDayLimit());

        flashcardDeckRepository.save(flashcardDeck);

        return flashcardDeck;
    }

    @Override
    public void deleteFlashcardDeck(Long deckId) {
        FlashcardDeck flashcardDeck = this.findById(deckId);

        if(flashcardDeck!=null){
            List<Flashcard> flashcards = this.findFlashcardsByDeckId(deckId);
            flashcardRepository.deleteAll(flashcards);
            this.flashcardDeckRepository.delete(flashcardDeck);
        }
    }

    @Override
    public FlashcardDeck ChangeFlashcardDeckName(Long deckId, NewNameDto name) {
        FlashcardDeck flashcardDeck = this.findById(deckId);
        flashcardDeck.setName(name.getName());
        return flashcardDeckRepository.save(flashcardDeck);
    }


}
