package com.researchpaper.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "personal_libraries")
public class PersonalLibrary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "paper_id", nullable = false)
    private ResearchPaper paper;

    private Integer readingProgress = 0; // 0-100

    private Boolean isFavorite = false;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime addedAt;

    // Constructors
    public PersonalLibrary() {}

    public PersonalLibrary(User user, ResearchPaper paper) {
        this.user = user;
        this.paper = paper;
    }

    // Getters and Setters
    public Long getLibraryId() {
        return libraryId;
    }

    public void setLibraryId(Long libraryId) {
        this.libraryId = libraryId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ResearchPaper getPaper() {
        return paper;
    }

    public void setPaper(ResearchPaper paper) {
        this.paper = paper;
    }

    public Integer getReadingProgress() {
        return readingProgress;
    }

    public void setReadingProgress(Integer readingProgress) {
        this.readingProgress = readingProgress;
    }

    public Boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(Boolean favorite) {
        isFavorite = favorite;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }
}