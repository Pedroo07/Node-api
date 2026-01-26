import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/', (_, res) => {
  
return res.send('Ola')
})

router.post('/', (req, res) => {
  console.log(req.body)
return res.status(StatusCodes.BAD_REQUEST).json(req.body)
})

export {router}