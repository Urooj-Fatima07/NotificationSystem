import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => NotificationsGateway)) 
    private readonly notificationsGateway: NotificationsGateway
  ) {}

  private messages = [
    { message: '🛒 New Order Received!', type: 'success' },
    { message: '📩 You have a new message!', type: 'info' },
    { message: '⚠️ Low stock warning!', type: 'warning' },
    { message: '❌ Payment failed!', type: 'error' },
    { message: '🚀 New feature released!', type: 'success' },
    { message: '🔔 System update scheduled.', type: 'info' },
    { message: '🔴 Server is down!', type: 'error' },
    { message: '⚡ High CPU usage detected!', type: 'warning' }
  ];

  private lastNotificationIndex: number | null = null;
 
  triggerRandomNotification(userId: string) {
      let randomIndex;
      
      // Ensure a new notification is selected
      do {
          randomIndex = Math.floor(Math.random() * this.messages.length);
      } while (randomIndex === this.lastNotificationIndex);
      
      this.lastNotificationIndex = randomIndex; // Store last sent notification
  
      const { message, type } = this.messages[randomIndex];
      this.notificationsGateway.sendNotification(userId, message, type);
  }  
}
