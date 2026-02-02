import { validate } from "../Shared/schemaValidation.js";
import { PlanesSchemaBody, PlanesSchemaParams,PlanesSchemaBodyUpdate } from "./schema.js";
import { Router } from "express";
import { cFindAllPlanes, cCreatePlan, cFindPlanesById,cUpdatePlan,cDeletePlan } from "./controller.js";

export const planesRouter = Router();

planesRouter.get('/', cFindAllPlanes);
planesRouter.get('/:id_plan',validate({params: PlanesSchemaParams}), cFindPlanesById);
planesRouter.post('/', validate({body: PlanesSchemaBody}), cCreatePlan);
planesRouter.put('/:id_plan', validate({body: PlanesSchemaBodyUpdate, params: PlanesSchemaParams}), cUpdatePlan);
planesRouter.delete('/:id_plan', validate({params:PlanesSchemaParams}), cDeletePlan)