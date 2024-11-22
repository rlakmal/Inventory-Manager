package com.inventory.user_service.util;

import com.inventory.user_service.exception.AlreadyExistingException;
import com.inventory.user_service.exception.PasswordMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler(AlreadyExistingException.class)
    public ResponseEntity<StandardResponse> handleAlreadyExistingException(AlreadyExistingException e){
        return new ResponseEntity<>(new StandardResponse(409,"Error",e.getMessage()),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<StandardResponse> handlePasswordMismatchException(PasswordMismatchException e){
        return new ResponseEntity<>(new StandardResponse(404,"Error",e.getMessage()),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<StandardResponse> handleUsernameNotFoundException(UsernameNotFoundException e){
        return new ResponseEntity<>(new StandardResponse(404,"Error",e.getMessage()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<StandardResponse> handleBadCredentialsException(BadCredentialsException e){
        return new ResponseEntity<>(new StandardResponse(404,"Error",e.getMessage()),HttpStatus.BAD_REQUEST);
    }
}
