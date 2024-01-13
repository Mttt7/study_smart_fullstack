package com.mt.studysmart.studysmart.controller;

import com.mt.studysmart.studysmart.dto.AddFlashcardPayload;
import com.mt.studysmart.studysmart.dto.FlashcardDeckCreateDto;
import com.mt.studysmart.studysmart.dto.NewNameDto;
import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.service.CurrentSubdeckService;
import com.mt.studysmart.studysmart.service.FlashcardDeckService;
import com.mt.studysmart.studysmart.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
@RequiredArgsConstructor
public class FlashcardDeckController {

    private final FlashcardDeckService flashcardDeckService;

    private final CurrentSubdeckService currentSubdeckService;


    @GetMapping("/{deckId}")
    FlashcardDeck getFlashcardDeckById(@PathVariable Long deckId){
        return this.flashcardDeckService.findById(deckId);
    }

    @PatchMapping("/{deckId}/changeDayLimit")
    FlashcardDeck changeDayLimit(@PathVariable Long deckId, @RequestParam Long dayLimit){
        return this.flashcardDeckService.changeDayLimit(deckId,dayLimit);
    }

    @PatchMapping("/{deckId}")
    FlashcardDeck ChangeFlashcardDeckName(@PathVariable Long deckId, @RequestBody NewNameDto name){
        return this.flashcardDeckService.ChangeFlashcardDeckName(deckId,name);
    }

    @DeleteMapping("/{deckId}")
    void DeleteFlashcardDeck(@PathVariable Long deckId){
        this.flashcardDeckService.deleteFlashcardDeck(deckId);
    }



    @PostMapping("/")
    FlashcardDeck createFlashcardDeck(@RequestBody FlashcardDeckCreateDto flashcardDeckCreateDto){
        return flashcardDeckService.createFlashcardDeck(flashcardDeckCreateDto);
    }

    @GetMapping("/{deckId}/flashcards")
    List<Flashcard> getFlashcardsByDeckId(@PathVariable Long deckId){
        return this.flashcardDeckService.findFlashcardsByDeckId(deckId);
    }
    @GetMapping("/{deckId}/flashcards/paginated")
    Page<Flashcard> getFlashcardsByDeckIdWithPagination(@PathVariable Long deckId, Pageable pageable){
        return this.flashcardDeckService.findFlashcardsByDeckIdWithPagination(deckId, pageable);
    }

    @PostMapping("/{deckId}/flashcards")
    Flashcard addFlashcardToDeck(@PathVariable Long deckId, @RequestBody AddFlashcardPayload flashcardPayload){
        return this.flashcardDeckService.addFlashcardToDeck(deckId, flashcardPayload);
    }


    @GetMapping("/{deckId}/subdeck")
    public CurrentSubdeck getCurrentSubdeckByDeckId(@PathVariable Long deckId){
        return currentSubdeckService.getCurrentSubdeck(deckId);
    }

    @PatchMapping("/{deckId}/resetScore")
    List<Flashcard> resetScore(@PathVariable Long deckId, @RequestParam String type){
        return this.flashcardDeckService.resetScore(deckId,type);
    }


}
