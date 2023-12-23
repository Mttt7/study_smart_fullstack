package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.FlashcardRepository;
import com.mt.studysmart.studysmart.dto.FlashcardUpdateDto;
import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.service.CurrentSubdeckService;
import com.mt.studysmart.studysmart.service.FlashcardDeckService;
import com.mt.studysmart.studysmart.service.FlashcardService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Lazy))
public class FlashcardServiceImpl implements FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final FlashcardDeckService flashcardDeckService;
    @Lazy
    private final CurrentSubdeckService currentSubdeckService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Flashcard save(Flashcard flashcard) {
       return flashcardRepository.save(flashcard);
    }

    @Override
    public Flashcard findById(Long id) {
        return flashcardRepository.findById(id).orElse(null);
    }



    @Override
    public Flashcard updateFlashcard(FlashcardUpdateDto flashcardUpdateDto) {

        Flashcard dbFlashcard = this.findById(flashcardUpdateDto.getId());
        if(dbFlashcard == null){
            throw new RuntimeException("Flashcard not found");
        }

        dbFlashcard.setFrontContent(flashcardUpdateDto.getFrontContent());
        dbFlashcard.setBackContent(flashcardUpdateDto.getBackContent());


        if((dbFlashcard.getFlashcardDeck().getId() != flashcardUpdateDto.getDeckId()) && flashcardUpdateDto.getDeckId()!=null){
           FlashcardDeck tempFlashcardDeck = flashcardDeckService.findById(flashcardUpdateDto.getDeckId());
           if(tempFlashcardDeck!=null) {
               dbFlashcard.setFlashcardDeck(tempFlashcardDeck);
           }
        }

        return flashcardRepository.save(dbFlashcard);
    }

    @Override
    public List<Flashcard> findBySubdeckId(Long id) {
        return flashcardRepository.findAllByCurrentSubdeck_Id(id);
    }

    @Override
    public List<Flashcard> populateSubdeck(int limit, Long deckId) {
        Query query = entityManager.createNativeQuery(
                "SELECT * FROM flashcard WHERE deck_id = ?1 AND status = ?2", Flashcard.class
        );
        query.setParameter(1, deckId);
        query.setParameter(2, -1);
        query.setMaxResults(limit);
        return query.getResultList();
    }


    @Override
    @Transactional
    public void removeById(Long id) {
       flashcardRepository.removeById(id);
    }

    @Override
    public Long countByFlashcardDeckId(Long id) {
       return flashcardRepository.countByFlashcardDeckId(id);
    }

    @Override
    public List<Flashcard> findAllByFlashcardDeck_Id(Long id) {
        return flashcardRepository.findAllByFlashcardDeck_Id(id);
    }

    @Override
    public Flashcard addScore(Long id, int score) {
        Flashcard flashcard = this.findById(id);
        if(score==3 && flashcard.getScore()==3 && flashcard.getPreviousScore()==3){
            updateSubdeck(flashcard);
        }else{
            flashcard.setPreviousScore(flashcard.getScore());
            flashcard.setScore(score);
        }
        return this.save(flashcard);

    }

    private void updateSubdeck(Flashcard flashcard) {
        CurrentSubdeck currentSubdeck = flashcard.getCurrentSubdeck();
        flashcard.setStatus(1);
        flashcard.setCurrentSubdeck(null);

        this.currentSubdeckService.addNewFlashcardToSubdeck(currentSubdeck);
    }

    public Flashcard findPristineFlashcard(){
        Flashcard newFlashcard = this.flashcardRepository.findFirstFlashcardByStatus(-1);
        return newFlashcard;
    }


}
