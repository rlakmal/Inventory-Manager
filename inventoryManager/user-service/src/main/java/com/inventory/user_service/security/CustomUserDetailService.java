package com.inventory.user_service.security;
import com.inventory.user_service.entity.UserEntity;
import com.inventory.user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public CustomUserDetail loadUserByUsername(String username){
        if(!userRepo.existsByUsername(username)){
            throw new UsernameNotFoundException("Username Not Found! ");

        }
        UserEntity user = userRepo.findByUsername(username);
        return new CustomUserDetail(user.getUsername(),user.getPassword());

    }



}
