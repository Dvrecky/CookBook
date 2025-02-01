package com.ReactProjects.cookbook.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Dodaj regułę CORS dla wszystkich endpointów
                .allowedOrigins("http://localhost:3000") // Pozwól na połączenia z lokalnego frontendu
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Zezwól na te metody
                .allowedHeaders("*") // Zezwól na wszystkie nagłówki
                .allowCredentials(true); // Pozwól na przesyłanie ciasteczek, jeśli potrzebne
    }
}
