package com.mt.studysmart.studysmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlashcardUpdateDto {
    private Long id;
    private String frontContent;
    private String backContent;
    private Long deckId;
}
