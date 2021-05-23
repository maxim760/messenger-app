import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
import { UserService } from './user/user.service';
  
  @WebSocketGateway(3333)
  export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    constructor(
      private readonly userService: UserService,
    ) {}
  
    private logger: Logger = new Logger('AppGateway');
    
    @SubscribeMessage('messageToServer')
    handleMessage(client: Socket & {user: any}, {to, ...payload}): void {
      // const {from, avatar } = client.handshake.query
      this.server.in(to).emit('messageToClient', {...payload});
    }
    @SubscribeMessage('setUserToServer')
    handleSetUser(client: Socket & { user: any }, { user }): void {
      client.user = user
    }
    @SubscribeMessage('messageTypeToServer')
    handleMessageType(client: Socket & {user: any}, { to, status, chatId }): void {
      const user = client.user
      this.server.in(to).emit('messageTypeToClient', {user, status, chatId});
    }

    @SubscribeMessage('friendsToServer')
    handleFriends(client: Socket & { user: any }, { to, status }: { to: string, status: string }): void {
      const user = client.user
      const {from, avatar } = client.handshake.query
      this.server.in(to).emit("friendsToClient", {status,from, avatar, user })
    }

    
    afterInit(server: Server) {
      this.logger.log('Init');
    }
    
    handleDisconnect(client: Socket & { user: any }) {
      this.logger.log(`Client disconnected: ${client.id}`);
      const { userId } = client.handshake.query
      try {
        setTimeout(async () => {
          const isOnline = await this.userService.checkIsOnlineUser(userId)
          if (!isOnline) {
            try {
              await this.userService.setOfflineStatus(userId)
            } catch (error) {}
          } 
        }, +process.env.TIME_ONLINE)
      } catch (error) {
        console.log("Ошибка в сокете при ДИСКОННЕКТЕ: " + error.message);
          (async ()=>{
            await this.userService.setOfflineStatus(userId)
        })()
      }
        
    }
    
    handleConnection(client: Socket & {user: any}, ...args: any[]) {
      const { userId } = client.handshake.query
      this.userService.setOnlineStatus(userId)
      if (userId) {
        client.join(userId)
        this.logger.log(`Client connected: ${client.id}`);
      }
    }
  }