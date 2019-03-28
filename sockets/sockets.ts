// Lógica de los sockets
import { Socket } from "socket.io";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

interface Mensaje {
  de: string;
  cuerpo: string;
}

export const usuariosConectados = new UsuariosLista();

// Desconectar socket
export const desconectar = ( cliente: Socket ) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
    console.log( usuariosConectados.getLista() );
    
  });
}
// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
  cliente.on('mensaje', ( payload: Mensaje ) => {
    console.log('Mensaje recibido:', payload);
    io.emit('mensaje-nuevo', payload);
  });
}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {
  cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

    callback({
      ok: true,
      mensaje: `Usuario ${ payload.nombre } configurado.`
    });
  });
}

// Conectar cliente
export const conectarCliente = ( cliente: Socket ) => {
  const usuario = new Usuario( cliente.id );
  usuariosConectados.agregar(usuario);
  console.log(usuario);
}