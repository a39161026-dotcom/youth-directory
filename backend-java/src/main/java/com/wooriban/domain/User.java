package com.wooriban.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(nullable = false)
    private String password;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(nullable = false)
    private boolean isStaff = false;

    public User(String username, String email, String firstName, String encodedPassword) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.password = encodedPassword;
    }
}
