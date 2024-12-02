package com.inventory.user_service.controller;

import com.inventory.user_service.dto.*;
import com.inventory.user_service.service.UserService;
import com.inventory.user_service.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/login")
    public StandardResponse loginUser(@RequestBody LoginDTO loginDTO){

        return userService.loginUser(loginDTO);

    }

    @PostMapping(path = "/register")
    public StandardResponse registerUser(@RequestBody RegisterDTO registerDTO){
        return userService.registerUser(registerDTO);

    }

    @GetMapping("/details")
    public StandardResponse getDetails(){
        return userService.fetchUserDetail();
    }

    @PutMapping
    public StandardResponse updateDetails(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "userId") Integer userId
    ){
        return userService.updateProfile(email,name,userId);

    }

    @PostMapping("/forgot-password")
    public StandardResponse forgotPassword(@RequestBody EmailDTO emailDto ){
        return userService.forgetPassword(emailDto);
    }

    @PostMapping("/validate-otp")
    public StandardResponse validateOtp(@RequestBody OtpDTO otpDTO){
        return userService.validateOtp(otpDTO);

    }

    @PostMapping(path = "/change-password")
    public StandardResponse changePasswd(@RequestBody ChangePasswdDTO changePasswdDTO){
        return userService.changePasswd(changePasswdDTO);
    }
}
