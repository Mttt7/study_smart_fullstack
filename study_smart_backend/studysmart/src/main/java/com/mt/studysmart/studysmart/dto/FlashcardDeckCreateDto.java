package com.mt.studysmart.studysmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlashcardDeckCreateDto {
    private Long userProfileId;
    private String name;
    private Long dayLimit;

}

