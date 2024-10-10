package com.ust.wastewarden.users.service;

import com.ust.wastewarden.users.dto.NotificationDto;
import com.ust.wastewarden.users.dto.NotificationOutputDto;
import com.ust.wastewarden.users.model.Notifications;
import java.util.List;

public interface NotificationServiceImpl {

    public Notifications singleUser(Long id, NotificationDto notificationDto);
    public boolean toWorkers(NotificationDto notificationDto);
    public boolean toResident(NotificationDto notificationDto);
    public boolean toEveryone(NotificationDto notificationDto);
    public List<NotificationOutputDto> getNotifications(Long id);

}
