import {rFindAllAfiliados, rFindAfiliadoWithNro_afiliado, rCreateAfiliado, rUpdateAfiliado} from "./repository.js";
import { Afiliado } from "./entity.js";
import { alreadyExistsError } from "../Shared/errorsModel.js";

export async function sFindAllAfiliados(): Promise<Afiliado[]> {
    return await rFindAllAfiliados();
}


export async function sFindAfiliadoWithNro_afiliado(nro_afiliado: number | undefined): Promise<Afiliado | undefined > {
    const afiliado = await rFindAfiliadoWithNro_afiliado(nro_afiliado);
    return afiliado;
}

export async function sCreateAfiliado(afiliadoData: Afiliado): Promise<Afiliado | undefined | number> {
    try{
        const nro_afiliado = await rCreateAfiliado(afiliadoData);
        return (await rFindAfiliadoWithNro_afiliado(nro_afiliado));
    }catch (err: any) {
            // ORA-00001: unique constraint violated
            if (err.offset === 0 && err.message.includes('ORA-00001')) {
                throw new alreadyExistsError("El afiliado con ese DNI o Email ya se encuentra registrado.");
        }

    }
}

export async function sUpdateAfiliado(nro_afiliado: number, afiliadoData: Partial<Afiliado>): Promise<Afiliado | undefined> {
    try{
        await rUpdateAfiliado(nro_afiliado, afiliadoData);
        return (await rFindAfiliadoWithNro_afiliado(nro_afiliado));
    }catch (err: any) {
            // ORA-00001: unique constraint violated
            if (err.offset === 0 && err.message.includes('ORA-00001')) {
                throw new alreadyExistsError("El afiliado con ese DNI o Email ya se encuentra registrado.");
        }
    }
}