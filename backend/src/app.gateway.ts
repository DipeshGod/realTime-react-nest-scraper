import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('newProduct')
  handleNewProduct(client: any, payload: any): void {
    // Emit the 'newProduct' event to all connected clients
    this.server.emit('newProduct', payload);
  }

  @SubscribeMessage('scrapingStarted')
  handleScrapingStarted(client: any, payload: boolean) {
    this.server.emit('scrapingStarted', payload);
  }

  @SubscribeMessage('numberOfResults')
  handleNumberOfResults(client: any, payload: string) {
    this.server.emit('numberOfResults', payload);
  }
}
