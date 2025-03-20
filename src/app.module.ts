import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { AuthService } from './auth/auth.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationService } from './notifications/notifications.service';

@Module({
  imports: [],
  controllers: [AppController, NotificationsController],
  providers: [AppService, AuthService, NotificationsGateway, NotificationService], // ✅ Add NotificationsGateway & NotificationService
})
export class AppModule {}
