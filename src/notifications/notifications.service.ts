import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => NotificationsGateway)) 
    private readonly notificationsGateway: NotificationsGateway
  ) {}

  triggerNewOrderNotification(userId: string) {
    this.notificationsGateway.sendNotification(userId, '🛒 New Order Received!', 'success');
  }

  triggerNewMessageNotification(userId: string) {
    this.notificationsGateway.sendNotification(userId, '📩 You have a new message!', 'info');
  }
}
