package com.ust.wastewarden.users.dto;

import com.ust.wastewarden.users.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public record UserDto(

         String firstName,
         String lastName,
         String username,
         String password,
         String email,
         String location,
        @Enumerated(EnumType.STRING)
        Role role

) {
}
