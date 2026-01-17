import {sFindAllAfiliados, sFindAfiliadoWithNro_afiliado, /* sCreateAfiliado */} from "./service.js";
import { Request, Response, NextFunction } from "express";
import { handleErrorParam, InternalServerError, NotFoundError } from "../Shared/errorsModel.js";

export async function cFindAllAfiliados(req: Request, res: Response) {
    try {
        const afiliados = await sFindAllAfiliados();
        return res.status(200).json(afiliados);
    } catch (error) {
        throw new InternalServerError();
    }
}

export async function cFindAfiliadoWithNro_afiliado(req: Request, res: Response, next: NextFunction) {
    try {
        const afiliado = await sFindAfiliadoWithNro_afiliado(res.locals.params.nro_afiliado);
        
        if (afiliado === null) {
            throw new NotFoundError();
        }

        return res.status(200).json(afiliado);

    } catch (error) {
        handleErrorParam(error, next);
    }
}

/* export async function cCreateAfiliado(req: Request, res: Response, next: NextFunction) {
    try{
        const newAfiliado = await sCreateAfiliado(res.locals.body);
        return res.status(201).json(newAfiliado);
    }catch(error){
        handleErrorParam(error, next);
    }
} */