package com.mt.studysmart.studysmart.controller;

import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import com.mt.studysmart.studysmart.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {

    private UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }
    @GetMapping("/oktaId/{oktaId}")
    public Long getIdByOktaId(@PathVariable String oktaId){
        return this.userProfileService.getIdByOktaId(oktaId);
    }

    @GetMapping("/{id}")
    public UserProfile getUserProfileById(@PathVariable Long id){
        return this.userProfileService.getUserProfileById(id);
    }

    @GetMapping("/{id}/decks")
    public List<FlashcardDeck> getDecksByUserId(@PathVariable Long id){
        return this.userProfileService.getDecksByUserId(id);
    }
    @GetMapping("/{id}/decks/count")
    public int getDecksCountByUserId(@PathVariable Long id){
        return this.userProfileService.getDecksCountByUserId(id);
    }
    @GetMapping("/{id}/flashcards/countReviewedToday")
    public Long getReviewedTodayByUserId(@PathVariable Long id){
        return this.userProfileService.getReviewedTodayByUserId(id);
    }

    @GetMapping("/{id}/flashcards/count")
    public Long getFlashcardsCountByUserId(@PathVariable Long id){
        return this.userProfileService.getFlashcardsCountByUserId(id);
    }

    @GetMapping("/{id}/decks/paginated")
    public Page<FlashcardDeck> getDecksByUserIdWithPagination(@PathVariable Long id, Pageable pageable){
        return this.userProfileService.getDecksByUserIdWithPagination(id, pageable);
    }

    @GetMapping("/{id}/decks/paginated/search")
    public Page<FlashcardDeck> searchDecksByUserIdWithPagination(@PathVariable Long id, Pageable pageable, @RequestParam String keyword){
        return this.userProfileService.searchDecksByUserIdWithPagination(id, pageable,keyword);
    }
}
