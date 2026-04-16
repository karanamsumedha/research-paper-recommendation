package com.researchpaper.controller;

import com.researchpaper.entity.Feedback;
import com.researchpaper.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback savedFeedback = feedbackService.submitFeedback(feedback);
            return ResponseEntity.ok(savedFeedback);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/paper/{paperId}")
    public ResponseEntity<?> getPaperFeedback(@PathVariable Long paperId) {
        try {
            List<Feedback> feedbacks = feedbackService.getPaperFeedback(paperId);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserFeedback(@PathVariable Long userId) {
        try {
            List<Feedback> feedbacks = feedbackService.getUserFeedback(userId);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/rating/average/{paperId}")
    public ResponseEntity<?> getAverageRating(@PathVariable Long paperId) {
        try {
            Double averageRating = feedbackService.getAverageRating(paperId);
            Integer totalFeedback = feedbackService.getTotalFeedback(paperId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("paperId", paperId);
            response.put("averageRating", averageRating);
            response.put("totalFeedback", totalFeedback);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long feedbackId) {
        try {
            feedbackService.deleteFeedback(feedbackId);
            return ResponseEntity.ok("Feedback deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{feedbackId}")
    public ResponseEntity<?> updateFeedback(@PathVariable Long feedbackId, @RequestBody Feedback feedbackDetails) {
        try {
            Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedbackDetails);
            return ResponseEntity.ok(updatedFeedback);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/count/{paperId}")
    public ResponseEntity<?> getFeedbackCount(@PathVariable Long paperId) {
        try {
            Integer count = feedbackService.getTotalFeedback(paperId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}