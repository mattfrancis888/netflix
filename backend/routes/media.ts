import { Router, Request, Response } from "express";
import { getMedias, getMediaGenreAndCast } from "../controllers/media";
const mediasRouter = Router();

mediasRouter.get("/medias", getMedias);
mediasRouter.get("/genre-cast/:mediaId", getMediaGenreAndCast);
export default mediasRouter;
