package com.ust.wastewarden.users.mapper;

import com.ust.wastewarden.users.dto.UserDto;
import com.ust.wastewarden.users.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User dtoToUser(UserDto userDto , User user) {
        user.setFirstName(userDto.firstName());
        user.setLastName(userDto.lastName());
        user.setUsername(userDto.username());
        user.setPassword(userDto.password());
        user.setEmail(userDto.email());
        user.setLocation(userDto.location());
        user.setRole(userDto.role());
        return user;
    }



    public User touser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.firstName());
        user.setLastName(userDto.lastName());
        user.setUsername(userDto.username());
        user.setPassword(userDto.password());
        user.setEmail(userDto.email());
        user.setLocation(userDto.location());
        user.setRole(userDto.role());
        return user;
    }

}
