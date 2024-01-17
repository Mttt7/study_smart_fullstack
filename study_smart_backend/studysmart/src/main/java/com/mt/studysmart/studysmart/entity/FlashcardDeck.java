package com.mt.studysmart.studysmart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "reviewed_today")
    private Long reviewedToday;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @Column(name="flashcards_count")
    private Long flashcardsCount;

    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    @JsonIgnore
    private UserProfile userProfile;

    @OneToOne(mappedBy = "flashcardDeck", cascade = CascadeType.ALL)
    @JsonIgnore
    private CurrentSubdeck currentSubdeck;
}
