// Lógica de los sockets
import { Socket } from "socket.io";

interface Mensaje {
  de: string;
  cuerpo: string;
}

// Desconectar socket
export const desconectar = ( cliente: Socket ) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
}
// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
  cliente.on('mensaje', ( payload: Mensaje ) => {
    console.log('Mensaje recibido:', payload);
    io.emit('mensaje-nuevo', payload);
  });
}