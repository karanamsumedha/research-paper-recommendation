package com.researchpaper.controller;

import com.researchpaper.entity.ResearchPaper;
import com.researchpaper.service.ResearchPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/papers")
@CrossOrigin(origins = "*")
public class PaperController {

    @Autowired
    private ResearchPaperService paperService;

    @GetMapping("/search")
    public ResponseEntity<?> searchPapers(@RequestParam String keyword, 
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ResearchPaper> results = paperService.searchPapers(keyword, page, size);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/filter/domain")
    public ResponseEntity<?> filterByDomain(@RequestParam String domain) {
        try {
            List<ResearchPaper> papers = paperService.filterByDomain(domain);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/filter/year")
    public ResponseEntity<?> filterByYear(@RequestParam Integer year) {
        try {
            List<ResearchPaper> papers = paperService.filterByYear(year);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/filter/author")
    public ResponseEntity<?> filterByAuthor(@RequestParam String author) {
        try {
            List<ResearchPaper> papers = paperService.filterByAuthor(author);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{paperId}")
    public ResponseEntity<?> getPaperById(@PathVariable Long paperId) {
        try {
            ResearchPaper paper = paperService.getPaperById(paperId)
                    .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
            return ResponseEntity.ok(paper);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPapers(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ResearchPaper> papers = paperService.getAllPapers(page, size);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPaper(@RequestBody ResearchPaper paper) {
        try {
            ResearchPaper newPaper = paperService.addPaper(paper);
            return ResponseEntity.ok(newPaper);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{paperId}")
    public ResponseEntity<?> updatePaper(@PathVariable Long paperId, @RequestBody ResearchPaper paperDetails) {
        try {
            ResearchPaper updatedPaper = paperService.updatePaper(paperId, paperDetails);
            return ResponseEntity.ok(updatedPaper);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{paperId}")
    public ResponseEntity<?> deletePaper(@PathVariable Long paperId) {
        try {
            paperService.deletePaper(paperId);
            return ResponseEntity.ok("Paper deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/top-cited")
    public ResponseEntity<?> getTopCitedPapers(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<ResearchPaper> papers = paperService.getTopCitedPapers(limit);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentPapers(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<ResearchPaper> papers = paperService.getRecentPapers(limit);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}