import { Router, Request, Response } from "express";
import { getMedias } from "../controllers/media";
const mediasRouter = Router();

mediasRouter.get("/medias", getMedias);

export default mediasRouter;
