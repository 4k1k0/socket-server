import { Socket } from "socket.io";
import SocketIO from 'socket.io';

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  })
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
    console.log(`Mensaje recibido:`);
    console.log(payload);

    io.emit('mensaje-nuevo', payload);

  })
}

// Guardar usuario
export const login = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('configurar-usuario', (payload: {nombre: string}) => {
    console.log(`Llegó ${payload.nombre}`);
    console.log(payload);
  })
}