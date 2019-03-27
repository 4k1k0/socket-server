import { Router, Request, Response } from "express";

const router = Router();

router.get('/mensajes', ( req: Request, res: Response) => {
  res.json({
    mensaje: 'hola mundo'
  });
});

export default router;