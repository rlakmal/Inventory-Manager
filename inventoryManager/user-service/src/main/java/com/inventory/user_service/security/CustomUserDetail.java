package com.inventory.user_service.security;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetail extends User {

    public CustomUserDetail(String username, String password) {
        super(username, password, true, true, true, true, Collections.emptyList());
    }
}
