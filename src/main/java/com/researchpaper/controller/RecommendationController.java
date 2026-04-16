package com.researchpaper.controller;

import com.researchpaper.entity.Recommendation;
import com.researchpaper.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping("/generate/{userId}")
    public ResponseEntity<?> generateRecommendations(@PathVariable Long userId) {
        try {
            List<Recommendation> recommendations = recommendationService.generateRecommendations(userId);
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserRecommendations(@PathVariable Long userId) {
        try {
            List<Recommendation> recommendations = recommendationService.getUserRecommendations(userId);
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/mark-viewed/{recommendationId}")
    public ResponseEntity<?> markAsViewed(@PathVariable Long recommendationId) {
        try {
            Recommendation recommendation = recommendationService.markAsViewed(recommendationId);
            return ResponseEntity.ok(recommendation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/unviewed/{userId}")
    public ResponseEntity<?> getUnviewedRecommendations(@PathVariable Long userId) {
        try {
            List<Recommendation> recommendations = recommendationService.getUnviewedRecommendations(userId);
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{recommendationId}")
    public ResponseEntity<?> deleteRecommendation(@PathVariable Long recommendationId) {
        try {
            recommendationService.deleteRecommendation(recommendationId);
            return ResponseEntity.ok("Recommendation deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearUserRecommendations(@PathVariable Long userId) {
        try {
            recommendationService.clearUserRecommendations(userId);
            return ResponseEntity.ok("All recommendations cleared");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{recommendationId}")
    public ResponseEntity<?> getRecommendationById(@PathVariable Long recommendationId) {
        try {
            return ResponseEntity.ok(recommendationService.getRecommendationById(recommendationId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}