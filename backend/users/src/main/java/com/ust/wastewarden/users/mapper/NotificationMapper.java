package com.ust.wastewarden.users.mapper;

import com.ust.wastewarden.users.dto.NotificationDto;
import com.ust.wastewarden.users.dto.NotificationOutputDto;
import com.ust.wastewarden.users.model.Notifications;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationMapper {

    public List<NotificationDto> toDto(List<Notifications> notificationList) {
        List<NotificationDto> notifications = new ArrayList<>();
        for(Notifications n: notificationList) {
            NotificationDto nd = new NotificationDto(n.getMessage(),n.getType());
            notifications.add(nd);
        }

        return notifications;
    }

    public List<NotificationOutputDto> toOutput(List<Notifications> notificationList){
        List<NotificationOutputDto> notifications = new ArrayList<>();
        for(Notifications n: notificationList) {
            NotificationOutputDto nd = new NotificationOutputDto(n.getMessage(),n.getCreatedAt(),n.getType());
            notifications.add(nd);
        }

        return notifications;
    }

}
