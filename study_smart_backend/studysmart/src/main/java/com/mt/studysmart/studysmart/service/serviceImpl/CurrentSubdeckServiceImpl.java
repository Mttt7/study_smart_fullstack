package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.CurrentSubdeckRepository;
import com.mt.studysmart.studysmart.dao.FlashcardDeckRepository;
import com.mt.studysmart.studysmart.dao.FlashcardRepository;
import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.service.CurrentSubdeckService;
import com.mt.studysmart.studysmart.service.FlashcardDeckService;
import com.mt.studysmart.studysmart.service.FlashcardService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrentSubdeckServiceImpl implements CurrentSubdeckService {

    private final CurrentSubdeckRepository currentSubdeckRepository;
    private final FlashcardDeckService flashcardDeckService;
    private final FlashcardService flashcardService;



    @Override
    public CurrentSubdeck getCurrentSubdeck(Long deckId,int size) {
        CurrentSubdeck currentSubdeck = currentSubdeckRepository.findByFlashcardDeckId(deckId);
        if(currentSubdeck == null){
            currentSubdeck = new CurrentSubdeck();
            FlashcardDeck flashcardDeck =  flashcardDeckService.findById(deckId);
            if(size==-0){
                currentSubdeck.setSize(10);
            }else{
                currentSubdeck.setSize(size);
            }
            flashcardDeck.setCurrentSubdeck(currentSubdeck);
            currentSubdeck.setFlashcardDeck(flashcardDeck);
            populateSubdeck(currentSubdeck,flashcardDeck);
            currentSubdeckRepository.save(currentSubdeck);
        }
        return currentSubdeck;

    }



    public void addNewFlashcardToSubdeck(CurrentSubdeck currentSubdeck){
        Flashcard flashcard = this.flashcardService.findPristineFlashcard();
        if(flashcard != null){
            flashcard.setCurrentSubdeck(currentSubdeck);
        }
        this.flashcardService.save(flashcard);
    }


    private void populateSubdeck(CurrentSubdeck currentSubdeck, FlashcardDeck flashcardDeck){
        Long flashcardDeckSize = flashcardService.countByFlashcardDeckId(flashcardDeck.getId());
        if(currentSubdeck.getSize()>=flashcardDeckSize){
            List<Flashcard> tempFlashcards =  flashcardService.findAllByFlashcardDeck_Id(flashcardDeck.getId());
            tempFlashcards.forEach(flashcard -> flashcard.setCurrentSubdeck(currentSubdeck));
        }else{
            int size = currentSubdeck.getSize();
            List<Flashcard> tempFlashcards = flashcardService.findFlashcardsWithLowestScore(size);//-- dzieje sie to ttyylko za 1 razem wiec zadna nie ma wyniku!!!!
                                                        //zmienic na findRandom?FlashcardAmoiunt(size)
            tempFlashcards.forEach(flashcard ->{
                    flashcard.setCurrentSubdeck(currentSubdeck);
                    flashcardService.save(flashcard);
            });
        }
    }
}
