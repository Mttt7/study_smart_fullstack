package com.mt.studysmart.studysmart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "flashcard_deck")
@Getter
@Setter
public class FlashcardDeck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "day_limit")
    private Long dayLimit;

    @Column(name = "new_flashcards_today")
    private Long newFlashcardsToday;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;

    @OneToOne(mappedBy = "flashcardDeck", cascade = CascadeType.ALL)
    private CurrentSubdeck currentSubdeck;
}
