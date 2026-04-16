package com.researchpaper.service;

import com.researchpaper.entity.Recommendation;
import com.researchpaper.entity.ResearchPaper;
import com.researchpaper.entity.User;
import com.researchpaper.repository.PersonalLibraryRepository;
import com.researchpaper.repository.RecommendationRepository;
import com.researchpaper.repository.ResearchPaperRepository;
import com.researchpaper.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResearchPaperRepository paperRepository;

    @Autowired
    private PersonalLibraryRepository libraryRepository;

    // Generate personalized recommendations
    public List<Recommendation> generateRecommendations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Get user's research domain
        String userDomain = user.getResearchDomain();

        // Get papers already in user's library
        List<Long> savedPaperIds = libraryRepository.findByUserId(userId)
                .stream()
                .map(lib -> lib.getPaper().getPaperId())
                .collect(Collectors.toList());

        // Get all papers and filter based on domain and relevance
        List<ResearchPaper> allPapers = paperRepository.findAll();

        List<Recommendation> recommendations = allPapers.stream()
                .filter(paper -> !savedPaperIds.contains(paper.getPaperId()))
                .filter(paper -> userDomain == null || paper.getDomain().equalsIgnoreCase(userDomain))
                .map(paper -> {
                    Double score = calculateRelevanceScore(paper, user);
                    Recommendation rec = new Recommendation();
                    rec.setUser(user);
                    rec.setPaper(paper);
                    rec.setRelevanceScore(score);
                    return rec;
                })
                .sorted((r1, r2) -> Double.compare(r2.getRelevanceScore(), r1.getRelevanceScore()))
                .limit(10)
                .collect(Collectors.toList());

        return recommendationRepository.saveAll(recommendations);
    }

    // Calculate relevance score for a paper
    private Double calculateRelevanceScore(ResearchPaper paper, User user) {
        double score = 0.0;

        // Factor 1: Domain match
        if (user.getResearchDomain() != null && 
            paper.getDomain().equalsIgnoreCase(user.getResearchDomain())) {
            score += 0.4;
        }

        // Factor 2: Citation count (popularity)
        score += (paper.getCitationCount() / 100.0) * 0.3;

        // Factor 3: Recent publications
        int currentYear = java.time.Year.now().getValue();
        if (paper.getPublicationYear() != null) {
            int yearDiff = currentYear - paper.getPublicationYear();
            score += Math.max(0, (1 - yearDiff * 0.05)) * 0.3;
        }

        return Math.min(score, 1.0);
    }

    // Get recommendations for user
    public List<Recommendation> getUserRecommendations(Long userId) {
        return recommendationRepository.findByUserIdOrderByRelevanceScoreDesc(userId);
    }

    // Mark recommendation as viewed
    public Recommendation markAsViewed(Long recommendationId) {
        Recommendation rec = recommendationRepository.findById(recommendationId)
                .orElseThrow(() -> new IllegalArgumentException("Recommendation not found"));
        rec.setIsViewed(true);
        rec.setViewedAt(java.time.LocalDateTime.now());
        return recommendationRepository.save(rec);
    }

    // Get unviewed recommendations
    public List<Recommendation> getUnviewedRecommendations(Long userId) {
        return recommendationRepository.findByUserIdAndIsViewed(userId, false);
    }

    // Delete recommendation
    public void deleteRecommendation(Long recommendationId) {
        recommendationRepository.deleteById(recommendationId);
    }

    // Clear recommendations for user
    public void clearUserRecommendations(Long userId) {
        List<Recommendation> recs = recommendationRepository.findByUserId(userId);
        recommendationRepository.deleteAll(recs);
    }

    // Get single recommendation
    public Optional<Recommendation> getRecommendationById(Long recommendationId) {
        return recommendationRepository.findById(recommendationId);
    }
}