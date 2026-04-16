package com.researchpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitationDTO {
    private Long citationId;
    private Long paperId;
    private Long userId;
    private String citationText;
    private String citationFormat;
    private LocalDateTime createdAt;
}