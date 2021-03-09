"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var media_1 = require("../controllers/media");
var mediasRouter = express_1.Router();
mediasRouter.get("/medias", media_1.getMedias);
mediasRouter.get("/genre-cast/:mediaId", media_1.getMediaGenreAndCast);
mediasRouter.get("/watching", media_1.getMediaWatchingByUser);
exports.default = mediasRouter;
