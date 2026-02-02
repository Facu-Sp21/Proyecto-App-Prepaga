import z from 'zod'

export const PlanesSchemaBody = z.object({ 
    id_plan: z.number('Debe se un numero').int().positive().optional(),
    nombre: z.string().nonempty('El nombre del plan es obligatorio').trim().toUpperCase(),
    descripcion: z.string().nonempty('La descripcion del plan es obligatoria').trim(),
});

export const PlanesSchemaBodyUpdate = z.object({ 
    id_plan: z.number('Debe se un numero').int().positive().optional(),
    nombre: z.string().nonempty('El nombre del plan es obligatorio').trim().toUpperCase().optional(),
    descripcion: z.string().nonempty('La descripcion del plan es obligatoria').trim().optional(),
});

export const PlanesSchemaParams = z.object({
  id_plan: z.string().nonempty("El número de plan es obligatorio")
    .refine((val) => {
      const num = Number(val);
      return !Number.isNaN(num) && num > 0; // Si es un número y es positivo devuelve true
    }, {
      message: "Debe ser un número positivo",
    })
    .transform((val) => Number(val)) //  solo transforma si pasó la validación
});