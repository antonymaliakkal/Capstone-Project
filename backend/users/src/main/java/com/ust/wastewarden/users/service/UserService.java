package com.ust.wastewarden.users.service;

import com.ust.wastewarden.users.dto.UserDto;
import com.ust.wastewarden.users.exception.UserNotFoundException;
import com.ust.wastewarden.users.mapper.UserMapper;
import com.ust.wastewarden.users.model.Role;
import com.ust.wastewarden.users.model.User;
import com.ust.wastewarden.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserServiceImpl {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getWorkers() {
        List<User> workers = new ArrayList<>();

        List<User> users = userRepository.findAll();
        for(User user: users){
            if(user.getRole() == Role.WORKER){
                workers.add(user);
            }
        }
        return workers;
    }

    @Override
    public Optional<User> getUserById(Long id) {

        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) { return optionalUser; }

        throw new UserNotFoundException("User not found");
    }

    @Override
    public Optional<User> getUserByEmail(String email) {

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()) { return optionalUser; }

        throw new UserNotFoundException("User not found");
    }

    @Override
    public User createUser(UserDto userDto) {
        User user = userMapper.touser(userDto);
        System.out.println(user);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            userRepository.deleteById(id);
            return;
        }

        throw new UserNotFoundException("User not found");
    }

    @Override
    public User updateUser(Long id, UserDto updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            userRepository.save(userMapper.dtoToUser(updatedUser,user));
        }
        throw new UserNotFoundException("User not found");
    }
}
