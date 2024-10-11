package com.ust.wastewarden.users.controller;

import com.ust.wastewarden.users.dto.NotificationDto;
import com.ust.wastewarden.users.dto.NotificationOutputDto;
import com.ust.wastewarden.users.dto.UserDto;
import com.ust.wastewarden.users.model.Notifications;
import com.ust.wastewarden.users.model.User;
import com.ust.wastewarden.users.service.NotificationService;
import com.ust.wastewarden.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //Get all workers
    @GetMapping("/workers")
    public List<User> getWorkers() {
        return userService.getWorkers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get user by ID
    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody UserDto userDto) {
        System.out.println(userDto);
        return userService.createUser(userDto);
    }


    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDto updatedUser) {
        try {
            return ResponseEntity.ok(userService.updateUser(id, updatedUser));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

        // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User Deleted");
    }

    @GetMapping("/notifications/{id}")
    public ResponseEntity<List<NotificationOutputDto>> getNotification(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getNotifications(id));
    }

    @PostMapping("/notifications/{id}")
    public ResponseEntity<Notifications> addNotifications(@RequestBody NotificationDto notificationDto , @PathVariable Long id) {
        return ResponseEntity.ok(notificationService.singleUser(id,notificationDto));
    }

    @PostMapping("/notifications/all")
    public ResponseEntity<String> addNotification(@RequestBody NotificationDto notificationDto) {
        System.out.println(notificationDto);
        boolean b = notificationService.toEveryone(notificationDto);
        return ResponseEntity.ok("Added notification");
    }

    @PostMapping("/notifications/worker")
    public ResponseEntity<String> addNotificationWorker(@RequestBody NotificationDto notificationDto) {
        boolean b = notificationService.toWorkers(notificationDto);
        return ResponseEntity.ok("Added notification");
    }

    @PostMapping("/notifications/resident")
    public ResponseEntity<String> addNotificationResident(@RequestBody NotificationDto notificationDto) {

        boolean b = notificationService.toResident(notificationDto);
        return ResponseEntity.ok("Added notification");
    }

}
