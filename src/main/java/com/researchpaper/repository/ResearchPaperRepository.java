package com.researchpaper.repository;

import com.researchpaper.entity.ResearchPaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResearchPaperRepository extends JpaRepository<ResearchPaper, Long> {
    Page<ResearchPaper> findByTitleContainingIgnoreCaseOrAbstractContainingIgnoreCase(String title, String abstractText, Pageable pageable);
    List<ResearchPaper> findByDomain(String domain);
    Page<ResearchPaper> findByDomainIgnoreCase(String domain, Pageable pageable);
    List<ResearchPaper> findByPublicationYear(Integer year);
    List<ResearchPaper> findByAuthorsContainingIgnoreCase(String authors);
    Page<ResearchPaper> findTopByOrderByCitationCountDesc(Pageable pageable);
    Page<ResearchPaper> findAllByOrderByCreatedAtDesc(Pageable pageable);
}