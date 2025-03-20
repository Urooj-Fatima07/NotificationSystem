import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  sendNotification(@Body() { userId }: { userId: string }) {
    this.notificationService.triggerRandomNotification(userId);
    return { status: 'success', message: 'Notification sent successfully' };
  }
}
