package com.inventory.user_service.service;

import com.inventory.user_service.dto.*;
import com.inventory.user_service.util.StandardResponse;

public interface UserService {
    StandardResponse loginUser(LoginDTO loginDTO);

    StandardResponse registerUser(RegisterDTO registerDTO);

    StandardResponse fetchUserDetail();

    StandardResponse updateProfile(String email, String name,Integer userId);

    StandardResponse forgetPassword(EmailDTO emailDto);


    StandardResponse validateOtp(OtpDTO otpDTO);

    StandardResponse changePasswd(ChangePasswdDTO changePasswdDTO);
}
