import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  public agregar(usuario: Usuario): Usuario {
    console.log(usuario);
    this.lista.push(usuario);
    return usuario;
  }

  public actualizarNombre(id: string, nombre: string) {
    console.log('Actualizando usuario');
    for( const usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        console.log(usuario);
        break;
      }
    }
  }

  public getLista(): Usuario[] {
    return this.lista;
  }

  public getUsuario(id: string): Usuario | undefined {
    return this.lista.find(u => u.id === id);
  }

  public getUsersEnSala(sala: string): Usuario[] | undefined {
    return this.lista.filter(u => u.sala === sala);
  }

  public borrarUsuario(id: string): Usuario | undefined {
    const tempUser = this.getUsuario(id);
    this.lista = this.lista.filter(u => u.id !== id);
    return tempUser;
  }

}