package com.mt.studysmart.studysmart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "okta_id")
    private String oktaId;



    @OneToMany(cascade = CascadeType.ALL, mappedBy ="userProfile" )
    private List<FlashcardDeck> flashcardDecks;

}
