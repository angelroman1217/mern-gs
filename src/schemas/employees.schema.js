import {z} from 'zod';

export const createEmployeesSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre es requerido',
    }),
    app: z.string({
        required_error: 'Apellido paterno es requerido',
    }),
    apm: z.string({
        required_error: 'Apellido materno es requerido',
    }),
    nacimiento: z.coerce.date({
        errorMap: (issue, { defaultError}) => ({
            message: issue.code === 'invalid_type' ? 'Fecha de nacimiento es requerida' : defaultError
        }) 
    }),
    nacionalidad: z.string({
        required_error: 'Nacionalidad es requerido',
    }),
    funciones: z.array(z.string({
        required_error: 'Al menos una funcion es requerida',
    }))
})