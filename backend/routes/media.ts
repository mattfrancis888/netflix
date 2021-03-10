import { Router, Request, Response } from "express";
import {
    getMedias,
    getMediaGenreAndCast,
    getMediaWatchingByUser,
    addToWatchingByUser,
} from "../controllers/media";
const mediasRouter = Router();

mediasRouter.get("/medias", getMedias);
mediasRouter.get("/genre-cast/:mediaId", getMediaGenreAndCast);
mediasRouter.get("/watching", getMediaWatchingByUser);
mediasRouter.post("/add-to-watching/:mediaId", addToWatchingByUser);
export default mediasRouter;
