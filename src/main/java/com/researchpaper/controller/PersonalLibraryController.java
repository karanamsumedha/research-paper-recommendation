package com.researchpaper.controller;

import com.researchpaper.entity.PersonalLibrary;
import com.researchpaper.service.PersonalLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "*")
public class PersonalLibraryController {

    @Autowired
    private PersonalLibraryService libraryService;

    @PostMapping("/save")
    public ResponseEntity<?> savePaper(@RequestBody PersonalLibrary library) {
        try {
            PersonalLibrary savedLibrary = libraryService.savePaper(library);
            return ResponseEntity.ok(savedLibrary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserLibrary(@PathVariable Long userId) {
        try {
            List<PersonalLibrary> library = libraryService.getUserLibrary(userId);
            return ResponseEntity.ok(library);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/favorites/{userId}")
    public ResponseEntity<?> getUserFavorites(@PathVariable Long userId) {
        try {
            List<PersonalLibrary> favorites = libraryService.getUserFavorites(userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update-progress/{libraryId}")
    public ResponseEntity<?> updateReadingProgress(@PathVariable Long libraryId, @RequestParam Integer progress) {
        try {
            PersonalLibrary updated = libraryService.updateReadingProgress(libraryId, progress);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/add-note/{libraryId}")
    public ResponseEntity<?> addNote(@PathVariable Long libraryId, @RequestParam String note) {
        try {
            PersonalLibrary updated = libraryService.addNote(libraryId, note);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/toggle-favorite/{libraryId}")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long libraryId) {
        try {
            PersonalLibrary updated = libraryService.toggleFavorite(libraryId);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{libraryId}")
    public ResponseEntity<?> removePaper(@PathVariable Long libraryId) {
        try {
            libraryService.removePaper(libraryId);
            return ResponseEntity.ok("Paper removed from library");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}