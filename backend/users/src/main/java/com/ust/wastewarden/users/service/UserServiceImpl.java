package com.ust.wastewarden.users.service;

import com.ust.wastewarden.users.dto.UserDto;
import com.ust.wastewarden.users.model.User;
import java.util.List;
import java.util.Optional;

public interface UserServiceImpl {

    public List<User> getAllUsers();
    public List<User> getWorkers();
    public Optional<User> getUserById(Long id);
    public User createUser(UserDto user);
    public void deleteUser(Long id);
    public User updateUser(Long id, UserDto updatedUser);
    public Optional<User> getUserByEmail(String email);

}
