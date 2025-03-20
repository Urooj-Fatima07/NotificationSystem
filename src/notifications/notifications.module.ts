import { Module, forwardRef } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  imports: [],
  controllers: [NotificationsController], // ✅ Add this line
  providers: [NotificationService, NotificationsGateway],
  exports: [NotificationService],
})
export class NotificationsModule {}
