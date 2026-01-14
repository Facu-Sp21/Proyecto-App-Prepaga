import {sFindAllAfiliados, sFindAfiliadoWithNro_afiliado} from "./service.js";
import { Request, Response } from "express";
import { validate } from "../Shared/schemaValidation.js";

export async function cFindAllAfiliados(req: Request, res: Response) {
    try {
        const afiliados = await sFindAllAfiliados();
        return res.status(200).json(afiliados);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(501).json({message: error.message});
        }
        return res.status(500).json({message: 'Error interno del servidor'});
    }
}