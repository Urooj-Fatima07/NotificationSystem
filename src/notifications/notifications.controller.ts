import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  sendNotification(
    @Body() { userId, message, type }: { userId: string; message: string; type: 'info' | 'warning' | 'error' | 'success' }
  ) {
    this.notificationService.triggerNewOrderNotification(userId);
    return { status: 'success', message: 'Notification sent successfully' };
  }
}
