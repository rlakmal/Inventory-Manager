package com.inventory.user_service.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/inventory")
public class TestController {
    @GetMapping(path = "/test")
    public String testFunction (){
        return "test working";
    }

}
