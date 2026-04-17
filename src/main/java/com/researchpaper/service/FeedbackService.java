package com.researchpaper.service;

import com.researchpaper.entity.Feedback;
import com.researchpaper.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback submitFeedback(Feedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        if (feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getPaperFeedback(Long paperId) {
        return feedbackRepository.findByPaper_PaperId(paperId);
    }

    public List<Feedback> getUserFeedback(Long userId) {
        return feedbackRepository.findByUser_UserId(userId);
    }

    public Double getAverageRating(Long paperId) {
        OptionalDouble average = feedbackRepository.findByPaper_PaperId(paperId)
                .stream()
                .mapToInt(Feedback::getRating)
                .average();
        return average.isPresent() ? average.getAsDouble() : 0.0;
    }

    public Integer getTotalFeedback(Long paperId) {
        return feedbackRepository.findByPaper_PaperId(paperId).size();
    }

    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }

    public Feedback updateFeedback(Long feedbackId, Feedback feedbackDetails) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new IllegalArgumentException("Feedback not found"));
        feedback.setRating(feedbackDetails.getRating());
        feedback.setFeedbackText(feedbackDetails.getFeedbackText());
        return feedbackRepository.save(feedback);
    }
}