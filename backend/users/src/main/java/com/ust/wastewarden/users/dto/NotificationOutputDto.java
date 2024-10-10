package com.ust.wastewarden.users.dto;

import com.ust.wastewarden.users.model.NotificationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public record NotificationOutputDto(
        String message,
        Date date,
        @Enumerated(EnumType.STRING)
        NotificationType type
) {}
