package com.researchpaper.repository;

import com.researchpaper.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByPaper_PaperId(Long paperId);
    List<Feedback> findByUser_UserId(Long userId);
    List<Feedback> findByPaper_PaperIdAndRating(Long paperId, Integer rating);
}