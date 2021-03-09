import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";
import media from "../backend-build/routes/media";

interface genreAndCast {
    casts?: any;
    genres?: any;
}

export const getMedias = async (req: Request, res: Response) => {
    try {
        const response = await pool.query(`SELECT * FROM media`);
        res.send({ medias: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        pool.query("ROLLBACK");
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getMediaGenreAndCast = async (req: Request, res: Response) => {
    try {
        let mediaId = req.params.mediaId;

        //Transaction
        await pool.query("BEGIN");

        //Get Genre
        const genreResponse = await pool.query(
            `SELECT genre_name FROM lookup_media_genre
            NATURAL JOIN genre WHERE media_id = $1;`,
            [mediaId]
        );
        //Get Cast / Actors
        const castResponse = await pool.query(
            `SELECT actor_first_name, actor_last_name FROM lookup_media_actor
            NATURAL JOIN actor WHERE media_id = $1;`,
            [mediaId]
        );
        pool.query("COMMIT");
        let results: genreAndCast = {};
        results.casts = castResponse.rows;
        results.genres = genreResponse.rows;
        res.send(results);
        // res.send({...response.rows})
    } catch (error) {
        pool.query("ROLLBACK");
        console.log("ROLLBACK TRIGGERED");

        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};
