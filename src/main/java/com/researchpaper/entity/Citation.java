package com.researchpaper.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "citations")
public class Citation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long citationId;

    @ManyToOne
    @JoinColumn(name = "paper_id", nullable = false)
    private ResearchPaper paper;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String citationText;

    @Column(nullable = false)
    private String citationFormat; // APA, IEEE, Chicago, MLA

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Citation() {}

    public Citation(ResearchPaper paper, User user, String citationText, String citationFormat) {
        this.paper = paper;
        this.user = user;
        this.citationText = citationText;
        this.citationFormat = citationFormat;
    }

    // Getters and Setters
    public Long getCitationId() {
        return citationId;
    }

    public void setCitationId(Long citationId) {
        this.citationId = citationId;
    }

    public ResearchPaper getPaper() {
        return paper;
    }

    public void setPaper(ResearchPaper paper) {
        this.paper = paper;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCitationText() {
        return citationText;
    }

    public void setCitationText(String citationText) {
        this.citationText = citationText;
    }

    public String getCitationFormat() {
        return citationFormat;
    }

    public void setCitationFormat(String citationFormat) {
        this.citationFormat = citationFormat;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}