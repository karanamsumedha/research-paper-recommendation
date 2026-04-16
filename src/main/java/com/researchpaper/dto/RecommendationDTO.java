package com.researchpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationDTO {
    private Long recommendationId;
    private Long userId;
    private Long paperId;
    private String paperTitle;
    private String paperAuthors;
    private String domain;
    private Double relevanceScore;
    private Boolean isViewed;
    private LocalDateTime viewedAt;
    private LocalDateTime createdAt;
}