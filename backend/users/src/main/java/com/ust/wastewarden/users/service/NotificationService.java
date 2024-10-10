package com.ust.wastewarden.users.service;

import com.ust.wastewarden.users.dto.NotificationDto;
import com.ust.wastewarden.users.dto.NotificationOutputDto;
import com.ust.wastewarden.users.exception.UserNotFoundException;
import com.ust.wastewarden.users.mapper.NotificationMapper;
import com.ust.wastewarden.users.model.NotificationType;
import com.ust.wastewarden.users.model.Notifications;
import com.ust.wastewarden.users.model.Role;
import com.ust.wastewarden.users.model.User;
import com.ust.wastewarden.users.repository.NotificationRepository;
import com.ust.wastewarden.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Optional;
import java.util.List;

@Service
public class NotificationService implements NotificationServiceImpl{

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationMapper notificationMapper;


    @Override
    public Notifications singleUser(Long id , NotificationDto notificationDto) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            Notifications notifications = new Notifications();
            notifications.setMessage(notificationDto.message());
            notifications.setType(notificationDto.type());
            notifications.setUser(user);
            notificationRepository.save(notifications);
            user.addNotification(notifications);
            userRepository.save(user);
            return notifications;
        }

        throw new UserNotFoundException("User Not Found");
    }

    @Override
    public boolean toWorkers(NotificationDto notificationDto) {
        List<User> userList = userRepository.findAll();
        for(User user: userList) {
            if(user.getRole().equals(Role.WORKER)) {
                Notifications user1 = singleUser(user.getUserid() , notificationDto);
            }
        }
        return true;
    }

    @Override
    public boolean toResident(NotificationDto notificationDto) {
        List<User> userList = userRepository.findAll();
        for(User user: userList) {
            if(user.getRole().equals(Role.RESIDENT)) {
                Notifications user1 = singleUser(user.getUserid() , notificationDto);
            }
        }
        return true;
    }

    @Override
    public boolean toEveryone(NotificationDto notificationDto) {
        List<User> userList = userRepository.findAll();
        for(User user: userList) {
            Notifications user1 = singleUser(user.getUserid() , notificationDto);
        }
        return true;
    }

    @Override
    public List<NotificationOutputDto> getNotifications(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            return notificationMapper.toOutput(user.getNotifications());
        }

        throw new UserNotFoundException("User not found");
    }
}
