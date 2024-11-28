package com.inventory.user_service.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private String accessToken;
    private int userId;
    private String username;
    private String email;
    private String name;

    public UserDTO(int userId, String username, String email, String name) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.name = name;
    }
}
