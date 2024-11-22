package com.inventory.user_service.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data

public class RegisterDTO {

    private String email;
    private String username;
    private String name;
    private String password;
    private String rePassword;
}
