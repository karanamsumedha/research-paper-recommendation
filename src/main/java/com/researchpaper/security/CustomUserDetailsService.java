package com.researchpaper.security;

import com.researchpaper.entity.User;
import com.researchpaper.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                getAuthorities(user.getUserRole())
        );
    }

    public UserDetails loadUserById(Long userId) throws UsernameNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                getAuthorities(user.getUserRole())
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        
        if (role != null) {
            if (role.equals("ADMIN")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                authorities.add(new SimpleGrantedAuthority("ROLE_CONTENT_CURATOR"));
                authorities.add(new SimpleGrantedAuthority("ROLE_RESEARCHER"));
            } else if (role.equals("CONTENT_CURATOR")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_CONTENT_CURATOR"));
                authorities.add(new SimpleGrantedAuthority("ROLE_RESEARCHER"));
            } else if (role.equals("RESEARCHER")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_RESEARCHER"));
            }
        }
        
        return authorities;
    }
}