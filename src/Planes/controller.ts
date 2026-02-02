import { NotFoundError } from "../Shared/errorsModel.js";
import {sFindAllPlanes, sCreatePlan, sFindPlanesById, sUpdatePlan, sDeletePlan} from "./service.js";
import { Request, Response, NextFunction } from "express";

export async function cFindAllPlanes(req: Request, res: Response, next: NextFunction) {
    try {
        const planes = await sFindAllPlanes();
        return res.status(200).json(planes);
    } catch (error) {
        next(error);
    }
}

export async function cFindPlanesById(req: Request, res: Response, next: NextFunction) {
    try {
        const id_plan = res.locals.params.id_plan;
        const plan = await sFindPlanesById(id_plan);
        if(!plan){
            throw new NotFoundError;
        }
        return res.status(200).json(plan);
      
    } catch (error) {
        next(error);
    }
}

export async function cCreatePlan(req: Request, res: Response, next: NextFunction) {
    try {
        const newPlan = await sCreatePlan(res.locals.body);
        return res.status(201).json(newPlan);
    } catch (error) {
        next(error);
    }
}

export async function cUpdatePlan(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedPlan = await sUpdatePlan(res.locals.body, res.locals.params.id_plan);
        return res.status(200).json(updatedPlan);
    } catch (error) {
        next(error);
    }
}

export async function cDeletePlan(req: Request, res: Response, next: NextFunction) {
    try {
        await sDeletePlan(res.locals.params.id_plan);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}