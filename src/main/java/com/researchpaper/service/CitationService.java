package com.researchpaper.service;

import com.researchpaper.entity.Citation;
import com.researchpaper.entity.ResearchPaper;
import com.researchpaper.entity.User;
import com.researchpaper.repository.CitationRepository;
import com.researchpaper.repository.ResearchPaperRepository;
import com.researchpaper.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CitationService {

    @Autowired
    private CitationRepository citationRepository;

    @Autowired
    private ResearchPaperRepository paperRepository;

    @Autowired
    private UserRepository userRepository;

    // Generate APA Citation Format
    public String generateAPACitation(ResearchPaper paper) {
        return String.format("%s (%d). %s. Retrieved from %s",
                paper.getAuthors(),
                paper.getPublicationYear(),
                paper.getTitle(),
                paper.getUrl());
    }

    // Generate IEEE Citation Format
    public String generateIEEECitation(ResearchPaper paper) {
        return String.format("[1] %s, \"%s,\" %d. [Online]. Available: %s",
                paper.getAuthors(),
                paper.getTitle(),
                paper.getPublicationYear(),
                paper.getUrl());
    }

    // Generate Chicago Citation Format
    public String generateChicagoCitation(ResearchPaper paper) {
        return String.format("%s. \"%s.\" %d. Accessed from %s",
                paper.getAuthors(),
                paper.getTitle(),
                paper.getPublicationYear(),
                paper.getUrl());
    }

    // Generate MLA Citation Format
    public String generateMLACitation(ResearchPaper paper) {
        return String.format("%s. \"%s.\" %d. Web. %s",
                paper.getAuthors(),
                paper.getTitle(),
                paper.getPublicationYear(),
                paper.getUrl());
    }

    // Save citation with paper and user relationships
    public Citation saveCitation(Citation citation) {
        citation.setCreatedAt(LocalDateTime.now());
        return citationRepository.save(citation);
    }

    // Get citations by user ID
    public List<Citation> getCitationsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return citationRepository.findByUser(user);
    }

    // Get citations by paper ID
    public List<Citation> getCitationsByPaper(Long paperId) {
        ResearchPaper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
        return citationRepository.findByPaper(paper);
    }

    // Delete citation by ID
    public void deleteCitation(Long citationId) {
        citationRepository.deleteById(citationId);
    }

    // Get citation by ID
    public Citation getCitationById(Long citationId) {
        return citationRepository.findById(citationId)
                .orElseThrow(() -> new IllegalArgumentException("Citation not found"));
    }
}