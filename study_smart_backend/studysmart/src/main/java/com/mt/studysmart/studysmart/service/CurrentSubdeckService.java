package com.mt.studysmart.studysmart.service;

import com.mt.studysmart.studysmart.entity.CurrentSubdeck;
import com.mt.studysmart.studysmart.entity.FlashcardDeck;

public interface CurrentSubdeckService {
    CurrentSubdeck getCurrentSubdeck(Long deckId);

    void updateSubdeck(CurrentSubdeck currentSubdeck, FlashcardDeck flashcardDeck);
}
