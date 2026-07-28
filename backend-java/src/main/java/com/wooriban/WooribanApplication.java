package com.wooriban;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WooribanApplication {
    public static void main(String[] args) {
        SpringApplication.run(WooribanApplication.class, args);
    }
}
