package com.researchpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequestDTO {
    private String keyword;
    private String domain;
    private Integer year;
    private String author;
    private int page = 0;
    private int size = 10;
}