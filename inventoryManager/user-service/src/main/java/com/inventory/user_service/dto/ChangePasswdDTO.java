package com.inventory.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangePasswdDTO {
    private String password;
    private String rePassword;
    private String username;
}
