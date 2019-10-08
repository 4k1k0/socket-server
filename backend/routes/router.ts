import { Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    msj: 'todo ok'
  })
});

router.post('/mensajes', (req: Request, res: Response) => {
  const { body } = req;
  const { cuerpo, de } = body;
  const payload = {
    cuerpo,
    de
  }
  const server = Server.instance;
  server.io.emit('mensaje-nuevo', payload);
  res.json({
    ok: true,
    cuerpo,
    de
  })
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

export default router;