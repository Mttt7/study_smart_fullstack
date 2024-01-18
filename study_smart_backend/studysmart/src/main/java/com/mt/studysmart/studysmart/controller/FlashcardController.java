package com.mt.studysmart.studysmart.controller;

import com.mt.studysmart.studysmart.dto.FlashcardUpdateDto;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.service.CsvExportService;
import com.mt.studysmart.studysmart.service.FlashcardService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flashcards")
public class FlashcardController {

    private final FlashcardService flashcardService;
    private final CsvExportService csvExportService;


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

    @GetMapping("/getCsv/{userId}")
    void getAllFlashcardsInCsvByUserId(HttpServletResponse servletResponse,@PathVariable Long userId) throws IOException {
        servletResponse.setContentType("text/csv");
        servletResponse.addHeader("Content-Disposition","attachment; filename=\"employees.csv\"");
        csvExportService.writeFlashcardsToCsv(servletResponse.getWriter(),userId);
    }

}
