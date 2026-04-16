package com.researchpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String userRole;
    private String researchDomain;
    private String profilePicture;
    private String bio;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}