package com.researchpaper.controller;

import com.researchpaper.dto.AuthRequestDTO;
import com.researchpaper.dto.AuthResponseDTO;
import com.researchpaper.entity.User;
import com.researchpaper.security.JwtTokenProvider;
import com.researchpaper.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequestDTO authRequest) {
        try {
            User user = new User();
            user.setUsername(authRequest.getUsername());
            user.setEmail(authRequest.getEmail());
            user.setPassword(authRequest.getPassword());
            user.setFirstName(authRequest.getFirstName());
            user.setLastName(authRequest.getLastName());

            User registeredUser = userService.registerUser(user);
            
            String token = tokenProvider.generateToken(registeredUser.getUsername(), registeredUser.getUserId());
            
            AuthResponseDTO response = new AuthResponseDTO(
                    true,
                    "User registered successfully",
                    token,
                    null,
                    tokenProvider.getExpirationTime(token)
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new AuthResponseDTO(false, e.getMessage(), null, null, 0)
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequestDTO authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );

            User user = userService.findByUsername(authRequest.getUsername()).orElse(null);
            String token = tokenProvider.generateToken(authRequest.getUsername(), user.getUserId());

            AuthResponseDTO response = new AuthResponseDTO(
                    true,
                    "Login successful",
                    token,
                    null,
                    tokenProvider.getExpirationTime(token)
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new AuthResponseDTO(false, "Invalid credentials", null, null, 0)
            );
        }
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUserProfile(userId, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam Long userId, @RequestParam String oldPassword, @RequestParam String newPassword) {
        try {
            userService.changePassword(userId, oldPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}