package com.mt.studysmart.studysmart.controller;

import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.service.CurrentSubdeckService;
import com.mt.studysmart.studysmart.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subdeck")
@RequiredArgsConstructor
public class CurrentSubdeckController {

    private final FlashcardService flashcardService;
    private final CurrentSubdeckService currentSubdeckService;


    @GetMapping("/{subdeckId}/flashcards")
    List<Flashcard> getFlashcardsBySubdeckId(@PathVariable Long subdeckId){
        return this.flashcardService.findBySubdeckId(subdeckId);
    }




}
