import { getConnection } from "../DB/connection.js";
import { Afiliado } from "./entity.js";

export async function  rFindAllAfiliados (): Promise<Afiliado[]> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(`SELECT * FROM afiliado`);
        return result.rows || [];
    } finally {
        await conn.close();
    }
}

/* export async function rFindAfiliadoWithNro_afiliado(nro_afiliado: number): Promise<Afiliado | null> {
    throw new Error("Function not implemented.");
} */