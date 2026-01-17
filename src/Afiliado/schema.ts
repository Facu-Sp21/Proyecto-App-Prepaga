import {z} from 'zod'
import { BadRequestError } from '../Shared/errorsModel.js';

export const AfiliadoSchemaBody = z.object({
    nro_afiliado: z.number('Debe se un numero').int().positive(),
    dni_numero: z.string().length(8, 'El DNI debe tener 8 caracteres'),
    dni_tipo: z.string().nonempty('El tipo de DNI es obligatorio'),
    nombre: z.string().nonempty('El nombre es obligatorio').trim(),
    apellido: z.string().nonempty('El apellido es obligatorio'),
    email: z.string().email('el email es invalido')
});

export const AfiliadoSchemaParams = z.object({
  nro_afiliado: z.string().nonempty("El número de afiliado es obligatorio")
    .refine((val) => {
      const num = Number(val);
      return !Number.isNaN(num) && num > 0; // Si es un número y es positivo devuelve true
    }, {
      message: "Debe ser un número positivo",
    })
    .transform((val) => Number(val)) //  solo transforma si pasó la validación
});