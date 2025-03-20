import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedClients: Map<string, { socket: Socket; userId: string }> = new Map();

  handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;
    if (!token) {
      console.log(`❌ Unauthorized attempt: ${client.id} - No token provided`);
      client.disconnect();
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };

      console.log(`✅ Authorized User: ${decoded.userId}`);

      client.join(decoded.userId); 
      this.connectedClients.set(client.id, { socket: client, userId: decoded.userId });
    } catch (error) {
      console.log(`❌ Unauthorized attempt: ${client.id} - Invalid token`, error.message);
      client.disconnect();
    }
  }
               
  handleDisconnect(client: Socket) {
    console.log(`❌ Client Disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    if (!data.userId) return;

    client.join(data.userId);
    console.log(`🔔 User ${data.userId} subscribed to notifications`);
  }

  // Emit event-driven notifications
  sendNotification(userId: string, message: string, type: string) {
    this.server.to(userId).emit('notification', { message, type }); 
    console.log(`📨 Notification sent to User ${userId}: ${message}`);
  }  
}
