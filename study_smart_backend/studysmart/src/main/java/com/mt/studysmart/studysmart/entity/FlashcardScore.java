package com.mt.studysmart.studysmart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "flashcard_score")
@Getter
@Setter
public class FlashcardScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "score_date")
    @CreationTimestamp
    private Date scoreDate;
}
