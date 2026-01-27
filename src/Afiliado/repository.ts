import { getConnection } from "../DB/connection.js";
import oracledb from "oracledb"; 
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

export async function rFindAfiliadoWithNro_afiliado(nro_afiliado: number | undefined): Promise<Afiliado | undefined> {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `SELECT * FROM afiliado WHERE nro_afiliado = :nro_afiliado`,
            { nro_afiliado: nro_afiliado }
        );
        return result.rows?.[0];
    } finally {
        await conn.close();
    }
}

export async function rCreateAfiliado(afiliado: Afiliado): Promise<number | undefined> {
    const conn = await getConnection();
    try {
        const insertResult = await conn.execute(
            `INSERT INTO afiliado (dni_numero, dni_tipo, nombre, apellido, email)
             VALUES (:dni_numero, :dni_tipo, :nombre, :apellido, :email)
             RETURNING nro_afiliado INTO :nro_afiliado_out`,
            {
                dni_numero: afiliado.dni_numero,
                dni_tipo: afiliado.dni_tipo,
                nombre: afiliado.nombre,
                apellido: afiliado.apellido,
                email: afiliado.email,
                // Variables de salida
                nro_afiliado_out:{ dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: false }
        );
        await conn.commit();

        const nro_afiliado_inserted = insertResult.outBinds.nro_afiliado_out[0];
        return nro_afiliado_inserted;

        }finally {
        await conn.close();
    }
}

export async function rUpdateAfiliado(nro_afiliado: number, afiliadoData: Partial<Afiliado> ): Promise<void> {
  const conn = await getConnection();
  try {
    const fields = [];
    const bindParams: Record<string, any> = { nro_afiliado };  // parametros para evitar SQL injection , estos se pasan como un objeto

    for (const [key, value] of Object.entries(afiliadoData)) {
      if (value !== undefined) {
        fields.push(`${key} = :${key}`);  // ejemplo → "nombre = :nombre"
        bindParams[key] = value;       }
    }

    if (fields.length > 0) {
      const query = `UPDATE afiliado SET ${fields.join(", ")} WHERE nro_afiliado = :nro_afiliado`;
      await conn.execute(query, bindParams);
    }
    await conn.commit();
  } finally {
    await conn.close();
  }
}