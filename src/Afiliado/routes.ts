import { Router } from "express";
import { cFindAllAfiliados,cFindAfiliadoWithNro_afiliado,cCreateAfiliado} from "./controller.js";
import { validate } from "../Shared/schemaValidation.js";
import { AfiliadoSchemaBody, AfiliadoSchemaParams } from "./schema.js";

export const afiliadoRouter = Router();

afiliadoRouter.get('/', cFindAllAfiliados);
afiliadoRouter.get('/:nro_afiliado',validate({params: AfiliadoSchemaParams}), cFindAfiliadoWithNro_afiliado);
afiliadoRouter.post('/', validate({body: AfiliadoSchemaBody}), cCreateAfiliado);




/*TO DO
findAllAFiliados,
obtener un afiliado con su numero de afiliado,
crear un afiliado con su datos validos,
actualizar informacion de un afiliado con su numero de afiliado,
agregar auth de usuarios para admin y afiliado permitiendo ciertas acciones segun el rol
afiliado solo puede ver y actualizar su informacion, menos nro_afiliado
admin puede crear, ver, actualizar y eliminar afiliados
*/