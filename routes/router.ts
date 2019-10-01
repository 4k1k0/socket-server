import { Router, Request, Response} from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    msj: 'todo ok'
  })
});

router.post('/mensajes', (req: Request, res: Response) => {
  const { body } = req;
  res.json({
    ok: true,
    msj: 'post',
    body
  })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const { body, params } = req;
  res.json({
    ok: true,
    msj: 'post',
    body,
    params
  })
});

export default router;