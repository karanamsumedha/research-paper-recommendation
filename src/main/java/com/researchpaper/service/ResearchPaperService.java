package com.researchpaper.service;

import com.researchpaper.entity.ResearchPaper;
import com.researchpaper.repository.ResearchPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResearchPaperService {

    @Autowired
    private ResearchPaperRepository paperRepository;

    // Search with pagination
    public Page<ResearchPaper> searchPapers(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return paperRepository.findByTitleContainingIgnoreCaseOrAbstractContainingIgnoreCase(keyword, keyword, pageable);
    }

    // Filter by domain
    public List<ResearchPaper> filterByDomain(String domain) {
        return paperRepository.findByDomain(domain);
    }

    // Filter by year
    public List<ResearchPaper> filterByYear(Integer year) {
        return paperRepository.findByPublicationYear(year);
    }

    // Filter by author
    public List<ResearchPaper> filterByAuthor(String author) {
        return paperRepository.findByAuthorsContainingIgnoreCase(author);
    }

    // Get paper by ID
    public Optional<ResearchPaper> getPaperById(Long paperId) {
        return paperRepository.findById(paperId);
    }

    // Get all papers with pagination
    public Page<ResearchPaper> getAllPapers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return paperRepository.findAll(pageable);
    }

    // Add new paper
    public ResearchPaper addPaper(ResearchPaper paper) {
        paper.setCreatedAt(LocalDateTime.now());
        paper.setUpdatedAt(LocalDateTime.now());
        if (paper.getCitationCount() == null) {
            paper.setCitationCount(0);
        }
        return paperRepository.save(paper);
    }

    // Update paper
    public ResearchPaper updatePaper(Long paperId, ResearchPaper paperDetails) {
        ResearchPaper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
        
        paper.setTitle(paperDetails.getTitle());
        paper.setAbstract(paperDetails.getAbstract());
        paper.setAuthors(paperDetails.getAuthors());
        paper.setPublicationYear(paperDetails.getPublicationYear());
        paper.setDomain(paperDetails.getDomain());
        paper.setKeywords(paperDetails.getKeywords());
        paper.setUrl(paperDetails.getUrl());
        paper.setUpdatedAt(LocalDateTime.now());
        
        return paperRepository.save(paper);
    }

    // Delete paper
    public void deletePaper(Long paperId) {
        paperRepository.deleteById(paperId);
    }

    // Get top cited papers
    public List<ResearchPaper> getTopCitedPapers(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return paperRepository.findTopByOrderByCitationCountDesc(pageable).getContent();
    }

    // Get recent papers
    public List<ResearchPaper> getRecentPapers(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return paperRepository.findAllByOrderByCreatedAtDesc(pageable).getContent();
    }
}