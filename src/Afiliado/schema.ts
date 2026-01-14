import {z} from 'zod'

export const AfiliadoSchemaBody = z.object({
    nro_afiliado: z.number('Debe se un numero').int().positive(),
    dni_numero: z.string().length(8, 'El DNI debe tener 8 caracteres'),
    dni_tipo: z.string().nonempty('El tipo de DNI es obligatorio'),
    nombre: z.string().nonempty('El nombre es obligatorio').trim(),
    apellido: z.string().nonempty('El apellido es obligatorio'),
    email: z.string().email('el email es invalido')
});