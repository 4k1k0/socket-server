import { Socket } from "socket.io";
import SocketIO from 'socket.io';
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario); 
}

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    const usuarioBorrado = usuariosConectados.borrarUsuario(cliente.id);
    console.log('Cliente desconectado');
    console.log(usuarioBorrado);
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

// configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
  

    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre}, configurado`
    })
  })
}
