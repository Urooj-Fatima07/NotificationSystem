import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly authService: AuthService
  ) {}

  @Post('send-notification')
  sendNotification(@Body() body: { userId: string, message: string, type: 'info' | 'warning' | 'error' | 'success' }) {
    this.notificationsGateway.sendNotification(body.userId, body.message, body.type);
    return { success: true, message: 'Notification sent' };
  }

  @Post('generate-token')
  generateToken(@Body() body: { userId: string }) {
    const token = this.authService.generateToken(body.userId);
    return { token };
  }
}
