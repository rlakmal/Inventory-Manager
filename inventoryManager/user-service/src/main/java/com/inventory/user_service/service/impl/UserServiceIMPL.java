package com.inventory.user_service.service.impl;
import com.inventory.user_service.dto.LoginDTO;
import com.inventory.user_service.dto.RegisterDTO;
import com.inventory.user_service.dto.UserDTO;
import com.inventory.user_service.entity.UserEntity;
import com.inventory.user_service.exception.AlreadyExistingException;
import com.inventory.user_service.exception.PasswordMismatchException;
import com.inventory.user_service.repo.UserRepo;
import com.inventory.user_service.service.UserService;
import com.inventory.user_service.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.rmi.AlreadyBoundException;
@Service
public class UserServiceIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

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

        System.out.println(user);
        userRepo.save(user);

        return new StandardResponse(200,"Register Success",user);
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