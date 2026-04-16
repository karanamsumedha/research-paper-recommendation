package com.researchpaper.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "paper_id", nullable = false)
    private ResearchPaper paper;

    @Column(nullable = false)
    private Double relevanceScore; // 0.0 - 1.0

    private Boolean isViewed = false;

    private LocalDateTime viewedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Recommendation() {}

    public Recommendation(User user, ResearchPaper paper, Double relevanceScore) {
        this.user = user;
        this.paper = paper;
        this.relevanceScore = relevanceScore;
    }

    // Getters and Setters
    public Long getRecommendationId() {
        return recommendationId;
    }

    public void setRecommendationId(Long recommendationId) {
        this.recommendationId = recommendationId;
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

    public Double getRelevanceScore() {
        return relevanceScore;
    }

    public void setRelevanceScore(Double relevanceScore) {
        this.relevanceScore = relevanceScore;
    }

    public Boolean getIsViewed() {
        return isViewed;
    }

    public void setIsViewed(Boolean viewed) {
        isViewed = viewed;
    }

    public LocalDateTime getViewedAt() {
        return viewedAt;
    }

    public void setViewedAt(LocalDateTime viewedAt) {
        this.viewedAt = viewedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}