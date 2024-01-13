package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.CurrentSubdeckRepository;
import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.service.CurrentSubdeckService;
import com.mt.studysmart.studysmart.service.FlashcardDeckService;
import com.mt.studysmart.studysmart.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrentSubdeckServiceImpl implements CurrentSubdeckService {

    private final CurrentSubdeckRepository currentSubdeckRepository;
    private final FlashcardDeckService flashcardDeckService;
    private final FlashcardService flashcardService;


    @Override
    public CurrentSubdeck getCurrentSubdeck(Long deckId) {
        FlashcardDeck flashcardDeck = flashcardDeckService.findById(deckId);
        System.out.println(flashcardDeck);
        if (flashcardDeck == null) {
            return null;
        }

        CurrentSubdeck currentSubdeck = currentSubdeckRepository.findByFlashcardDeckId(deckId);
        System.out.println(currentSubdeck);
        if (currentSubdeck == null) {
            currentSubdeck = new CurrentSubdeck();
            flashcardDeck.setCurrentSubdeck(currentSubdeck);
            currentSubdeck.setFlashcardDeck(flashcardDeck);
            currentSubdeck.setSize(5);
        }
        updateSubdeck(currentSubdeck,flashcardDeck);
        currentSubdeckRepository.save(currentSubdeck);

        flashcardDeck.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        flashcardDeckService.save(flashcardDeck);
        return currentSubdeck;

    }


    public void updateSubdeck(CurrentSubdeck currentSubdeck, FlashcardDeck flashcardDeck) {
        System.out.println("=====CURRENT SUBDECK: "+ currentSubdeck);
        int subdeckSize = currentSubdeck.getSize();
        //tutaj blad, id jest nullem i znajduje wszystkie fiszki ktore maja null i wychodzi z 41
        List<Flashcard> flashcardsInSubdeck = flashcardService.findBySubdeckId(currentSubdeck.getId());
        int subdeckLength = flashcardsInSubdeck.size();
        System.out.println(flashcardsInSubdeck);
        System.out.println("SUBDECK LENGTH:"+subdeckLength);
        System.out.println("SUBDECK SIZE"+ subdeckSize);
        if(subdeckLength<subdeckSize){
            System.out.println("MNIEJSZY!!!!");
            int flashcardsToAdd = subdeckSize-subdeckLength;
            for(int i=0;i<flashcardsToAdd;i++){
                Flashcard tempFlashcard = flashcardService.findPristineFlashcardFromDeckId(flashcardDeck.getId());
                System.out.println("FLaschabrd: "+ tempFlashcard);
                if(tempFlashcard==null){break;}

                tempFlashcard.setCurrentSubdeck(currentSubdeck);
                tempFlashcard.setStatus(0);
                System.out.println(tempFlashcard);
                flashcardService.save(tempFlashcard);
            }

        }
    }
}
