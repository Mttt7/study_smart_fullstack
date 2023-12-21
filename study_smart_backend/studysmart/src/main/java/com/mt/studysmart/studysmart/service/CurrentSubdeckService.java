package com.mt.studysmart.studysmart.service;

import com.mt.studysmart.studysmart.entity.CurrentSubdeck;

public interface CurrentSubdeckService {
    CurrentSubdeck getCurrentSubdeck(Long deckId,int size);

   void addNewFlashcardToSubdeck(CurrentSubdeck currentSubdeck);

}
