import { getConnection } from "../DB/connection.js";
import { Afiliado } from "./entity.js";

export async function  rFindAllAfiliados (): Promise<Afiliado[]> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(`SELECT * FROM afiliado`);
        return result.rows || [];
        console.log(result);
    } finally {
        await conn.close();
    }
}

export async function rFindAfiliadoWithNro_afiliado(nro_afiliado: number): Promise<Afiliado | null> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `SELECT * FROM afiliado WHERE nro_afiliado = :nro_afiliado`,
            [nro_afiliado]
        );
        const afiliados = result.rows || [];
        return afiliados.length > 0 ? afiliados[0] : null;
    } finally {
        await conn.close();
    }
}