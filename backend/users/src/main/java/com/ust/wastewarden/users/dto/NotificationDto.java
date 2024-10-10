package com.ust.wastewarden.users.dto;

import com.ust.wastewarden.users.model.NotificationType;
import com.ust.wastewarden.users.model.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record NotificationDto(
        String message,
        @Enumerated(EnumType.STRING)
        NotificationType type
        ) {}
