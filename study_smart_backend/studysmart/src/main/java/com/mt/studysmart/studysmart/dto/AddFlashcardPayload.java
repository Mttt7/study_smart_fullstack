package com.mt.studysmart.studysmart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddFlashcardPayload {
    private String frontContent;
    private String backContent;

    @Override
    public String toString() {
        return "AddFlashcardPayload{" +
                "frontContent='" + frontContent + '\'' +
                ", backContent='" + backContent + '\'' +
                '}';
    }
}
