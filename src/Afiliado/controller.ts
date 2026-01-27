import {sFindAllAfiliados, sFindAfiliadoWithNro_afiliado, sCreateAfiliado, sUpdateAfiliado} from "./service.js";
import { Request, Response, NextFunction } from "express";
import { InternalServerError, NotFoundError } from "../Shared/errorsModel.js";

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
        
        if (!afiliado) {
            throw new NotFoundError();
        }

        return res.status(200).json(afiliado);

    } catch (error) {
        next(error);
    }
}

export async function cCreateAfiliado(req: Request, res: Response, next: NextFunction) {
    try{
        const newAfiliado = await sCreateAfiliado(res.locals.body);
        return res.status(201).json(newAfiliado);
    }catch(error){
        next(error);
    }
}

export async function cUpdateAfiliado(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedAfiliado = await sUpdateAfiliado(res.locals.params.nro_afiliado, res.locals.body);
        return res.status(200).json(updatedAfiliado);
    } catch (error) {
        next(error);
    }
}