package com.researchpaper.service;

import com.researchpaper.entity.User;
import com.researchpaper.repository.UserRepository;
import com.researchpaper.repository.ResearchPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResearchPaperRepository paperRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by role
    public List<User> getUsersByRole(String role) {
        return userRepository.findByUserRole(role);
    }

    // Promote user to Content Curator
    public User promoteUserToCurator(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setUserRole("CONTENT_CURATOR");
        return userRepository.save(user);
    }

    // Demote user back to researcher
    public User demoteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setUserRole("RESEARCHER");
        return userRepository.save(user);
    }

    // Get system statistics
    public Map<String, Object> getSystemStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalPapers", paperRepository.count());
        stats.put("researchers", userRepository.findByUserRole("RESEARCHER").size());
        stats.put("curators", userRepository.findByUserRole("CONTENT_CURATOR").size());
        return stats;
    }

    // Generate activity report
    public Map<String, Object> generateActivityReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("generatedAt", java.time.LocalDateTime.now());
        report.put("totalUsers", userRepository.count());
        report.put("totalPapers", paperRepository.count());
        report.put("activeUsers", userRepository.findAll().size());
        return report;
    }

    // Delete user
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Monitor user activity (placeholder for activity logging)
    public void logUserActivity(Long userId, String action) {
        // This would log to an activity table in real implementation
        System.out.println("User " + userId + " performed: " + action);
    }
}