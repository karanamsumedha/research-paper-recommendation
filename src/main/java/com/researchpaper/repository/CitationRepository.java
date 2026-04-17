package com.researchpaper.repository;

import com.researchpaper.entity.Citation;
import com.researchpaper.entity.ResearchPaper;
import com.researchpaper.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CitationRepository extends JpaRepository<Citation, Long> {
    List<Citation> findByUser(User user);
    List<Citation> findByPaper(ResearchPaper paper);
}