package com.mt.studysmart.studysmart.controller;

import com.mt.studysmart.studysmart.dto.FlashcardUpdateDto;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.service.FlashcardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    private FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping("/{id}")
    Flashcard getFlashcardById(@PathVariable Long id){
        return flashcardService.findById(id);
    }

    @DeleteMapping("/{id}")
    void removeFlashcardById(@PathVariable Long id){
        flashcardService.removeById(id);
    }

    @PutMapping
    Flashcard updateFlashcard(@RequestBody FlashcardUpdateDto flashcardUpdateDto){
        return this.flashcardService.updateFlashcard(flashcardUpdateDto);
    }

    @PostMapping("/{id}/addScore")
    Flashcard addScore(@PathVariable Long id, @RequestParam int score){
        return flashcardService.addScore(id,score);
    }


}
