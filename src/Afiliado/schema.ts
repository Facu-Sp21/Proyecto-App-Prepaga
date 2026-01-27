import {z} from 'zod'

export const AfiliadoSchemaBody = z.object({
    nro_afiliado: z.number('Debe se un numero').int().positive().optional(),
    dni_numero: z.string().length(8, 'El DNI debe tener 8 caracteres'),
    dni_tipo: z.string().nonempty('El tipo de DNI es obligatorio').toUpperCase(),
    nombre: z.string().nonempty('El nombre es obligatorio').trim().toUpperCase(),
    apellido: z.string().nonempty('El apellido es obligatorio').trim().toUpperCase(),
    email: z.string().email('el email es invalido')
});
// es practicamente igual al de creacion pero permite objetos parciales
export const AfiliadoSchemaBodyUpdate = z.object({
    dni_numero: z.string().length(8, 'El DNI debe tener 8 caracteres').optional(),
    dni_tipo: z.string().nonempty('El tipo de DNI es obligatorio').optional().transform(val => val ? val.toUpperCase() : val),
    nombre: z.string().nonempty('El nombre es obligatorio').trim().optional().transform(val => val ? val.toUpperCase() : val),
    apellido: z.string().nonempty('El apellido es obligatorio').trim().optional().transform(val => val ? val.toUpperCase() : val),
    email: z.string().email('el email es invalido').optional()
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

