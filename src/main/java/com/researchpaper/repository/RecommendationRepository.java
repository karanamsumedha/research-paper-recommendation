package com.researchpaper.repository;

import com.researchpaper.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByUserIdOrderByRelevanceScoreDesc(Long userId);
    List<Recommendation> findByUserIdAndIsViewed(Long userId, Boolean isViewed);
    List<Recommendation> findByUserId(Long userId);
}