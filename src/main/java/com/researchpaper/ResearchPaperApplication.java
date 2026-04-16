package com.researchpaper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.researchpaper"})
public class ResearchPaperApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResearchPaperApplication.class, args);
        System.out.println("✅ Research Paper Recommendation Platform Started!");
        System.out.println("🌐 API Base URL: http://localhost:8080/api");
        System.out.println("📚 Application is running successfully!");
    }
}