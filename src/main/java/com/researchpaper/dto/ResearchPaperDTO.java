package com.researchpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchPaperDTO {
    private Long paperId;
    private String title;
    private String authors;
    private String abstractText;
    private Integer publicationYear;
    private String domain;
    private String keywords;
    private String url;
    private Integer citationCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}