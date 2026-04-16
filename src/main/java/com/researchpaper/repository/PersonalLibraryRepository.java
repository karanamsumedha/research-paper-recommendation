package com.researchpaper.repository;

import com.researchpaper.entity.PersonalLibrary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalLibraryRepository extends JpaRepository<PersonalLibrary, Long> {
    List<PersonalLibrary> findByUserId(Long userId);
    List<PersonalLibrary> findByUserIdAndIsFavorite(Long userId, Boolean isFavorite);
    Optional<PersonalLibrary> findByUserIdAndPaperId(Long userId, Long paperId);
}