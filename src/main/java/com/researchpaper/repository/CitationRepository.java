package com.researchpaper.repository;

import com.researchpaper.entity.Citation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CitationRepository extends JpaRepository<Citation, Long> {
    List<Citation> findByUserId(Long userId);
    List<Citation> findByPaperId(Long paperId);
    List<Citation> findByCitationFormat(String format);
}