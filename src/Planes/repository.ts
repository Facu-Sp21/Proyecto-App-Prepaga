import OracleDB from "oracledb";
import { Plan } from "./entity.js";
import { getConnection } from "../DB/connection.js";
import { get } from "http";

export async function rFindAllPlanes(): Promise<Plan[]> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(`SELECT * FROM plan`);
        return result.rows || [];
    } finally {
        await conn.close();
    }
}

export async function rFindPlanById(id_plan:number): Promise<Plan | null> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `SELECT * FROM plan WHERE id_plan = :id_plan`,
            { id_plan }
        );
        return result.rows?.[0] || null;
    } finally {
        await conn.close();
    }
}

export async function rCreatePlan(planData: Partial<Plan>): Promise<number> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `INSERT INTO plan (nombre, descripcion) VALUES (:nombre, :descripcion) RETURNING id_plan INTO :id_plan`,
            {
                nombre: planData.nombre,
                descripcion: planData.descripcion,
                id_plan: { type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT }
            }
        );
        await conn.commit();
        return result.outBinds.id_plan[0];
    } finally {
        await conn.close();
    }
}

export async function rUpdatePlan(planData: Partial<Plan>,id_plan: number): Promise<void> {
  const conn = await getConnection();
  try {
    const fields = [];
    const bindParams: Record<string, any> = { id_plan };  // parametros para evitar SQL injection , estos se pasan como un objeto
    for (const [key, value] of Object.entries(planData)) {
      if (value !== undefined) {
        fields.push(`${key} = :${key}`);  // ejemplo → "nombre = :nombre"
        bindParams[key] = value;       }
    }

    if (fields.length > 0) {
      const query = `UPDATE plan SET ${fields.join(", ")} WHERE id_plan = :id_Plan`;
      await conn.execute(query, bindParams);
    }
    await conn.commit();
  } finally {
    await conn.close();
  }
}

export async function rDeletePlan(id_plan:number): Promise<void>{
    const conn = await getConnection()
    try{
        const result = conn.execute('DELETE from plan where id_plan = :id_plan', {id_plan});
        conn.commit();
    }finally{
    await conn.close();
    }
}
    