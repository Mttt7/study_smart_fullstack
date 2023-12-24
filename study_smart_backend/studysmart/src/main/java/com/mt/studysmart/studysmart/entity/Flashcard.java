package com.mt.studysmart.studysmart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.Cleanup;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "flashcard")
@Getter
@Setter
public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "front_content")
    private String frontContent;

    @Column(name = "back_content")
    private String backContent;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    @JsonIgnore
    private FlashcardDeck flashcardDeck;


    @ManyToOne
    @JoinColumn(name = "subdeck_id")
    private CurrentSubdeck currentSubdeck;

    @Column(name = "previous_score")
    private int previousScore;

    @Column(name = "score")
    private int score;

    @Column(name = "status")
    private int status;

    @Override
    public String toString() {
        return "Flashcard{" +
                "id=" + id +
                ", frontContent='" + frontContent + '\'' +
                ", backContent='" + backContent + '\'' +
                ", dateCreated=" + dateCreated +
                ", lastUpdated=" + lastUpdated +
                ", flashcardDeck=" + flashcardDeck +
                ", currentSubdeck=" + currentSubdeck +
                ", score=" + score +
                '}';
    }
}
