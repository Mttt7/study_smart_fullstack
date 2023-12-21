package com.mt.studysmart.studysmart.controller;

import com.mt.studysmart.studysmart.entity.FlashcardDeck;
import com.mt.studysmart.studysmart.entity.UserProfile;
import com.mt.studysmart.studysmart.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {

    private UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/{id}")
    public UserProfile getUserProfileById(@PathVariable Long id){
        return this.userProfileService.getUserProfileById(id);
    }

    @GetMapping("/{id}/decks")
    public List<FlashcardDeck> getDecksByUserId(@PathVariable Long id){
        return this.userProfileService.getDecksByUserId(id);
    }



}
