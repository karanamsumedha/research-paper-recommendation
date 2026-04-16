package com.researchpaper.repository;

import com.researchpaper.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByPaperId(Long paperId);
    List<Feedback> findByUserId(Long userId);
    List<Feedback> findByPaperIdAndRating(Long paperId, Integer rating);
}