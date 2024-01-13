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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlashcardDeckServiceImpl implements FlashcardDeckService {

    private final FlashcardRepository flashcardRepository;
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
    public List<Flashcard> findGreenFlashcardsByDeckId(Long id) {
        return flashcardRepository.findAllByFlashcardDeck_IdAndAndStatus(id,1);
    }

    @Override
    public Page<Flashcard> findFlashcardsByDeckIdWithPagination(Long deckId, Pageable pageable) {
        updateScoreAndDayLimit(deckId);
        return flashcardRepository.findAllByFlashcardDeck_Id(deckId, pageable);
    }

    private void updateScoreAndDayLimit(Long deckId) {
        FlashcardDeck tempDeck = this.findById(deckId);

        List<Flashcard> tempFlashcards = flashcardRepository.findAllByFlashcardDeck_Id(deckId);
        LocalDate today = LocalDate.now();
        LocalDate lastUpdatedDateDeck = tempDeck.getLastUpdated().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        //Check if its not the same day
        if(today.getDayOfYear() != lastUpdatedDateDeck.getDayOfYear()){
            tempDeck.setReviewedToday(0L);
        }
        this.save(tempDeck);

        for (Flashcard f:
                tempFlashcards) {
            LocalDate lastUpdatedDateFlashcard = f
                    .getLastUpdated()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

            //Check if more than 3 day passed
            if(today.isAfter(lastUpdatedDateFlashcard.plusDays(3))){
                if(f.getScore()+f.getPreviousScore()>2){
                    f.setScore(0);
                    f.setPreviousScore(0);
                }
            //Check if more than 1 day passed
            }else if(today.isAfter(lastUpdatedDateFlashcard.plusDays(1))){
                if(f.getScore()+f.getPreviousScore()>2){
                    f.setScore(1);
                    f.setPreviousScore(1);
                }
            }
            flashcardRepository.save(f);
        }

    }

    @Override
    public FlashcardDeck changeDayLimit(Long deckId, Long dayLimit) {
        FlashcardDeck deck = this.findById(deckId);
        deck.setDayLimit(dayLimit);
        this.save(deck);
        return deck;
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

    @Override
    public List<Flashcard> resetScore(Long deckId,String type) {

        if(Objects.equals(type, "all")){
            List<Flashcard> tempFlashcards= this.findFlashcardsByDeckId(deckId);
            for (Flashcard f:
                    tempFlashcards) {
                f.setPreviousScore(0);
                f.setScore(0);
                f.setStatus(-1);
                f.setCurrentSubdeck(null);
                this.flashcardRepository.save(f);
            }
            return tempFlashcards;
        }
        else if(Objects.equals(type, "green")){
            List<Flashcard> tempFlashcards= this.findGreenFlashcardsByDeckId(deckId);
            for (Flashcard f:
                    tempFlashcards) {
                f.setPreviousScore(0);
                f.setScore(0);
                f.setStatus(-1);
                f.setCurrentSubdeck(null);
                this.flashcardRepository.save(f);
            }
            return tempFlashcards;
        }
        return null;
    }


}
