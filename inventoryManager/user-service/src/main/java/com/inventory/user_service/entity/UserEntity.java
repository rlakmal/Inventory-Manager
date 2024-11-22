package com.inventory.user_service.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserEntity {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(name = "email",unique = true,nullable = false)
    private String email;

    @Column(name = "username",unique = true,nullable = false)
    private String username;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "password",nullable = false)
    private String password;

    public UserEntity(String email, String username, String name, String password) {
        this.email = email;
        this.username = username;
        this.name = name;
        this.password = password;
    }
}
