package com.inventory.user_service.service.impl;
import com.inventory.user_service.dto.*;
import com.inventory.user_service.entity.UserEntity;
import com.inventory.user_service.exception.AlreadyExistingException;
import com.inventory.user_service.exception.PasswordMismatchException;
import com.inventory.user_service.repo.UserRepo;
import com.inventory.user_service.security.CustomUserDetailService;
import com.inventory.user_service.security.JwtService;
import com.inventory.user_service.service.UserService;
import com.inventory.user_service.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.rmi.AlreadyBoundException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    private static final SecureRandom secureRandom = new SecureRandom();

    @Override
    public StandardResponse loginUser(LoginDTO loginDTO) {
        UserDTO userDTO = null;
        if (userRepo.existsByUsername(loginDTO.getUsername())) {
            Authentication authentication;
            try {
                authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
                );
            } catch (BadCredentialsException e) {
                throw new BadCredentialsException("Incorrect Password");
            }

            if (authentication.isAuthenticated()) {
                UserEntity user = userRepo.findByUsername(loginDTO.getUsername());
                userDTO = new UserDTO(
                        jwtService.generateToken(customUserDetailService.loadUserByUsername(loginDTO.getUsername())),
                        user.getUserId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getName()
                );
            }

            return new StandardResponse(200, "Login Successful", userDTO);
        }else {
            throw new UsernameNotFoundException("UserName Not Found");
        }

    }

    @Override
    public StandardResponse registerUser(RegisterDTO registerDTO) {
        if(!registerDTO.getPassword().equals(registerDTO.getRePassword()) ){
            throw new PasswordMismatchException("Confirm Password Does Not Match");
        }

        this.checkUser(registerDTO.getEmail(), registerDTO.getUsername());

        UserEntity user = new UserEntity(
                registerDTO.getEmail(),
                registerDTO.getUsername(),
                registerDTO.getName(),
                passwordEncoder.encode(registerDTO.getPassword())

        );
        userRepo.save(user);

        return new StandardResponse(200,"Register Success",user);
    }

    @Override
    public StandardResponse fetchUserDetail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            String userName = authentication.getName();
            UserEntity user = userRepo.findByUsername(userName);
            UserDTO userDTO = new UserDTO(
                    user.getUserId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getName()
            );
            return new StandardResponse(200,"success",userDTO);

        }

        return null;
    }

    @Override
    public StandardResponse updateProfile(String email, String name, Integer userId) {
        UserEntity user = userRepo.getReferenceById(userId);
        if (!email.equals(user.getEmail())) {
            boolean isUserExists = userRepo.existsByEmail(email);
            if (isUserExists) {
                return new StandardResponse(404,"error",null);
            } else {
                user.setEmail(email);
                user.setName(name);
                userRepo.save(user);
                if(!name.equals(user.getName())){
                    return new StandardResponse(200, "Success",null);
                }else{
                    return new StandardResponse(200, "emailSuccess",null);
                }

            }
        } else {
            if(!name.equals(user.getName())){
                user.setName(name);
                userRepo.save(user);
            }
            return new StandardResponse(200, "nameSuccess", null);
        }
    }

    @Override
    public StandardResponse forgetPassword(EmailDTO emailDto) {
        String username = emailDto.getUsername();
        if(!userRepo.existsByUsername(username)){
            return new StandardResponse(400,"Error",null);
        }


        UserEntity user = userRepo.findByUsername(username);
        user.setOtp(this.generateSecureOTP());
        user.setOtpExpire(LocalDateTime.now().plusMinutes(10));
        userRepo.save(user);
        return new StandardResponse(200,"success",null);
    }

    @Override
    public StandardResponse validateOtp(OtpDTO otpDTO) {
        System.out.println(otpDTO.getOtp());
        if(!userRepo.existsByOtp(otpDTO.getOtp()))
            return new StandardResponse(404,"Otp Not Found",null);
        UserEntity user = userRepo.findByOtp(otpDTO.getOtp());
        if(user.getOtpExpire().isBefore(LocalDateTime.now()))
            return new StandardResponse(400,"Otp Expired",null);

        Map<String,String> userMap = new HashMap<>();
        userMap.put("username",user.getUsername());
        userMap.put("otp",user.getOtp());

        return new StandardResponse(200,"success",userMap);


    }

    @Override
    public StandardResponse changePasswd(ChangePasswdDTO changePasswdDTO) {
        UserEntity user = userRepo.findByUsername(changePasswdDTO.getUsername());
        user.setPassword(passwordEncoder.encode(changePasswdDTO.getPassword()));
        user.setOtp(null);
        user.setOtpExpire(null);
        userRepo.save(user);
        return new StandardResponse(200,"success",null);
    }


    private String generateSecureOTP() {
        int otp = 1000 + secureRandom.nextInt(9000);
        return String.valueOf(otp);
    }


    private void checkUser(String email, String username) {
        if(userRepo.existsByUsername(username)){
            throw new AlreadyExistingException("Username has already taken");
        }

        if(userRepo.existsByEmail(email)){
            throw new AlreadyExistingException("Email has already Taken");
        }


    }
}