import {rFindAllAfiliados /* rFindAfiliadoWithNro_afiliado */} from "./repository.js";
import { Afiliado } from "./entity.js";

export async function sFindAllAfiliados(): Promise<Afiliado[]> {
    return await rFindAllAfiliados();
}

export async function sFindAfiliadoWithNro_afiliado(): Promise<Afiliado[]> {
    return await rFindAllAfiliados();
}