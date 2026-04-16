package com.researchpaper.service;

import com.researchpaper.entity.PersonalLibrary;
import com.researchpaper.repository.PersonalLibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PersonalLibraryService {

    @Autowired
    private PersonalLibraryRepository libraryRepository;

    public PersonalLibrary savePaper(PersonalLibrary library) {
        library.setAddedAt(LocalDateTime.now());
        library.setReadingProgress(0);
        library.setIsFavorite(false);
        return libraryRepository.save(library);
    }

    public List<PersonalLibrary> getUserLibrary(Long userId) {
        return libraryRepository.findByUserId(userId);
    }

    public List<PersonalLibrary> getUserFavorites(Long userId) {
        return libraryRepository.findByUserIdAndIsFavorite(userId, true);
    }

    public PersonalLibrary updateReadingProgress(Long libraryId, Integer progress) {
        PersonalLibrary library = libraryRepository.findById(libraryId)
                .orElseThrow(() -> new IllegalArgumentException("Library entry not found"));
        library.setReadingProgress(progress);
        return libraryRepository.save(library);
    }

    public PersonalLibrary addNote(Long libraryId, String note) {
        PersonalLibrary library = libraryRepository.findById(libraryId)
                .orElseThrow(() -> new IllegalArgumentException("Library entry not found"));
        library.setNotes(note);
        return libraryRepository.save(library);
    }

    public PersonalLibrary toggleFavorite(Long libraryId) {
        PersonalLibrary library = libraryRepository.findById(libraryId)
                .orElseThrow(() -> new IllegalArgumentException("Library entry not found"));
        library.setIsFavorite(!library.getIsFavorite());
        return libraryRepository.save(library);
    }

    public void removePaper(Long libraryId) {
        libraryRepository.deleteById(libraryId);
    }

    public boolean isPaperInLibrary(Long userId, Long paperId) {
        return libraryRepository.findByUserIdAndPaperId(userId, paperId).isPresent();
    }
}