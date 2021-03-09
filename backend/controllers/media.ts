import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";

export const getMedias = async (req: Request, res: Response) => {
    try {
        const response = await pool.query(`SELECT * FROM media`);

        res.send({ medias: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        console.log(error);
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};
