package com.researchpaper.controller;

import com.researchpaper.entity.Citation;
import com.researchpaper.entity.ResearchPaper;
import com.researchpaper.service.CitationService;
import com.researchpaper.service.ResearchPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/citations")
@CrossOrigin(origins = "*")
public class CitationController {

    @Autowired
    private CitationService citationService;

    @Autowired
    private ResearchPaperService paperService;

    @GetMapping("/generate/apa/{paperId}")
    public ResponseEntity<?> generateAPACitation(@PathVariable Long paperId) {
        try {
            ResearchPaper paper = paperService.getPaperById(paperId)
                    .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
            String citation = citationService.generateAPACitation(paper);
            Map<String, String> response = new HashMap<>();
            response.put("format", "APA");
            response.put("citation", citation);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/generate/ieee/{paperId}")
    public ResponseEntity<?> generateIEEECitation(@PathVariable Long paperId) {
        try {
            ResearchPaper paper = paperService.getPaperById(paperId)
                    .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
            String citation = citationService.generateIEEECitation(paper);
            Map<String, String> response = new HashMap<>();
            response.put("format", "IEEE");
            response.put("citation", citation);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/generate/chicago/{paperId}")
    public ResponseEntity<?> generateChicagoCitation(@PathVariable Long paperId) {
        try {
            ResearchPaper paper = paperService.getPaperById(paperId)
                    .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
            String citation = citationService.generateChicagoCitation(paper);
            Map<String, String> response = new HashMap<>();
            response.put("format", "Chicago");
            response.put("citation", citation);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/generate/mla/{paperId}")
    public ResponseEntity<?> generateMLACitation(@PathVariable Long paperId) {
        try {
            ResearchPaper paper = paperService.getPaperById(paperId)
                    .orElseThrow(() -> new IllegalArgumentException("Paper not found"));
            String citation = citationService.generateMLACitation(paper);
            Map<String, String> response = new HashMap<>();
            response.put("format", "MLA");
            response.put("citation", citation);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveCitation(@RequestBody Citation citation) {
        try {
            Citation savedCitation = citationService.saveCitation(citation);
            return ResponseEntity.ok(savedCitation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCitationsByUser(@PathVariable Long userId) {
        try {
            List<Citation> citations = citationService.getCitationsByUser(userId);
            return ResponseEntity.ok(citations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/paper/{paperId}")
    public ResponseEntity<?> getCitationsByPaper(@PathVariable Long paperId) {
        try {
            List<Citation> citations = citationService.getCitationsByPaper(paperId);
            return ResponseEntity.ok(citations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{citationId}")
    public ResponseEntity<?> deleteCitation(@PathVariable Long citationId) {
        try {
            citationService.deleteCitation(citationId);
            return ResponseEntity.ok("Citation deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}