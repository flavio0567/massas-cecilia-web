import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import useSound from 'use-sound';
import boopNotification from '../../assets/boop.mp3';

import api from '../../services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

interface NotificationProps {
  id: string;
  created_at: string;
  order_id: string;
  content: string;
  timeDistance: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const [isChecked, setIsChecked] = useState(false);
  const [playActive] = useSound(boopNotification, { volume: 0.5 });

  const loadNotifications = useCallback(async () => {
    const response = await api.get('notifications');

    const data = response.data.map((notification: NotificationProps) => ({
      ...notification,
      timeDistance: formatDistance(
        parseISO(notification.created_at),
        new Date(),
        { addSuffix: true, locale: ptBR },
      ),
    }));
    setNotifications(data);
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // useEffect(() => {
  //   if (visible) {
  //     setInterval(loadNotifications(), 1000);
  //   }
  // }, [loadNotifications, visible]);

  const hasUnread = useMemo(
    () => !!notifications.find((notification) => notification.read === false),
    [notifications],
  );

  const handleToggleVisible = useCallback(() => {
    setVisible(!visible);
    notifications.map((notification) =>
      notification.read === false ? setIsChecked(true) : setIsChecked(false),
    );
  }, [setVisible, visible, notifications]);

  async function handleMarkAsRead(id: any) {
    await api.patch(`notifications/${id}`, { read: true });

    const updateNotification = notifications.map((notification: any) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );

    setNotifications(updateNotification);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadNotifications();

      if (hasUnread) {
        playActive();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isChecked, notifications, playActive, loadNotifications, hasUnread]);

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#fff" size={28} style={{ marginRight: 40 }} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification: NotificationProps) => (
            <Notification key={notification.id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
};

export default Notifications;
