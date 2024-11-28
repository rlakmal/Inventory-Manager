package com.inventory.user_service.service;

import com.inventory.user_service.dto.LoginDTO;
import com.inventory.user_service.dto.RegisterDTO;
import com.inventory.user_service.util.StandardResponse;

public interface UserService {
    StandardResponse loginUser(LoginDTO loginDTO);

    StandardResponse registerUser(RegisterDTO registerDTO);

    StandardResponse fetchUserDetail();

    StandardResponse updateProfile(String email, String name,Integer userId);
}
