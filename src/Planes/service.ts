import {rFindAllPlanes, rCreatePlan, rFindPlanById, rUpdatePlan, rDeletePlan} from "./repository.js";
import { Plan } from "./entity.js";
import { alreadyExistsError, NotFoundError } from "../Shared/errorsModel.js";
import { rDeleteAfiliado } from "../Afiliado/repository.js";

export async function sFindAllPlanes(): Promise<Plan[]> {
    return await rFindAllPlanes();
}

export async function sFindPlanesById(id_plan: number): Promise<Plan | null> {
    const plan = await rFindPlanById(id_plan);
    return plan;

}

export async function sCreatePlan(planData: Partial<Plan>): Promise<Plan | undefined | null> {
    try{
        const newPlan_id = await rCreatePlan(planData);
        return await sFindPlanesById(newPlan_id);
    }catch(err:any){
        if(err.offset===0 && err.message.includes("ORA-00001")){
            throw new alreadyExistsError("Un plan con ese nombre ya existe.");
        }
    }
}

export async function sUpdatePlan(planData: Partial<Plan>, id_plan: number): Promise<Plan | undefined | null> {
    try{
            await rUpdatePlan(planData, id_plan);
            return (await sFindPlanesById(id_plan));
        }catch (err: any) {
                // ORA-00001: unique constraint violated
                if (err.offset === 0 && err.message.includes('ORA-00001')) {
                    throw new alreadyExistsError("El plan con ese nombre ya se encuentra registrado.");
            }
        }
    }

export async function sDeletePlan(id_plan:number): Promise<void> {
    try{
        await rDeletePlan(id_plan)
    }catch(err:any){
          // ORA-02292: integrity constraint violated - child record found
            if (err.offset === 0 && err.message.includes('ORA-02292')) {
                throw new alreadyExistsError("No se puede eliminar el Plan porque tiene registros asociados.");
            }
    }
}