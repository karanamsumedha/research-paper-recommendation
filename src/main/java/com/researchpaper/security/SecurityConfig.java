package com.researchpaper.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // Public endpoints
                .antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html", "/**/*.css", "/**/*.js").permitAll()
                .antMatchers("/api/users/register").permitAll()
                .antMatchers("/api/users/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/papers/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/feedback/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/citations/**").permitAll()
                
                // Researcher endpoints (require ROLE_RESEARCHER)
                .antMatchers(HttpMethod.POST, "/api/library/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/library/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/library/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/library/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/recommendations/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/recommendations/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/feedback/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                
                // Content Curator endpoints (require ROLE_CONTENT_CURATOR)
                .antMatchers(HttpMethod.POST, "/api/papers/**").hasAnyRole("CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/papers/**").hasAnyRole("CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/papers/**").hasAnyRole("CONTENT_CURATOR", "ADMIN")
                
                // Admin endpoints (require ROLE_ADMIN)
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                
                // User profile endpoints
                .antMatchers(HttpMethod.GET, "/api/users/profile/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/users/profile/**").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/users/change-password").hasAnyRole("RESEARCHER", "CONTENT_CURATOR", "ADMIN")
                
                // All other requests require authentication
                .anyRequest()
                .authenticated()
                .and()
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8080", "*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}