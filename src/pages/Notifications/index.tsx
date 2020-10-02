import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

  useEffect(() => {
    async function loadNotifications() {
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
    }
    loadNotifications();
  }, []);

  const hasUnread = useMemo(
    () => !!notifications.find((notification) => notification.read === false),
    [notifications],
  );

  const handleToggleVisible = useCallback(() => {
    setVisible(!visible);
  }, [setVisible, visible]);

  async function handleMarkAsRead(id: any) {
    await api.patch(`notifications/${id}`, { read: true });

    const updateNotification = notifications.map((notification: any) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );

    setNotifications(updateNotification);
  }

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
