import { Router, Request, Response} from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
import { GraficaData } from '../classes/grafica';

const router = Router();

const grafica = new GraficaData();

router.get('/encuesta', (req: Request, res: Response) => {
  res.json(grafica.getDataGrafica())
});

router.post('/encuesta', (req: Request, res: Response) => {
  const { body } = req;
  const { opcion, unidades } = body;

  grafica.incrementarValor(Number(opcion), Number(unidades));

  const server = Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica());
  res.json(grafica.getDataGrafica())
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const { body, params } = req;
  const { cuerpo, de } = body;
  const { id } = params;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', payload);

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  })
});

router.get('/usuarios', (req: Request, res: Response) => {

  const server = Server.instance;
  server.io.clients( (err: any, clientes: string[]) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    return res.json({
      ok: true,
      clientes
    })
  });
});

router.get('/usuarios/detalle', (req: Request, res: Response) => {
  return res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  })
});

export default router;