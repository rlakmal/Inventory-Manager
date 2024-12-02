package com.inventory.user_service.repo;
import com.inventory.user_service.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<UserEntity,Integer> {


    boolean existsByEmail(String email);

    boolean existsByUsername(String username);


    UserEntity findByUsername(String username);

    UserEntity findByOtp(String otp);

    boolean existsByOtp(String otp);
}
