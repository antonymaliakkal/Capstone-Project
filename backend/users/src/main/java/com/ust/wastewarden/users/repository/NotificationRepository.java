package com.ust.wastewarden.users.repository;

import com.ust.wastewarden.users.model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notifications,Long> {
}
