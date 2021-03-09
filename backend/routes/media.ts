import { Router, Request, Response } from "express";
import {
    getMedias,
    getMediaGenreAndCast,
    getMediaWatchingByUser,
} from "../controllers/media";
const mediasRouter = Router();

mediasRouter.get("/medias", getMedias);
mediasRouter.get("/genre-cast/:mediaId", getMediaGenreAndCast);
mediasRouter.get("/watching", getMediaWatchingByUser);
export default mediasRouter;
