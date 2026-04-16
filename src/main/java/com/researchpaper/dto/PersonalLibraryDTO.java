package com.researchpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalLibraryDTO {
    private Long libraryId;
    private Long userId;
    private Long paperId;
    private String paperTitle;
    private String paperAuthors;
    private Integer readingProgress;
    private Boolean isFavorite;
    private String notes;
    private LocalDateTime addedAt;
}