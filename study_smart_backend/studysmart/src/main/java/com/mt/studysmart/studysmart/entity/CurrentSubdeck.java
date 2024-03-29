package com.mt.studysmart.studysmart.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "current_subdeck")
@Getter
@Setter
public class CurrentSubdeck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "size")
    private int size;

    @OneToOne
    @JoinColumn(name = "deck_id", referencedColumnName = "id")
    @JsonIgnore
    private FlashcardDeck flashcardDeck;
}
