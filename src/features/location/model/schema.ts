import { z } from 'zod'

export const LocationFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Заголовок повинен містити щонайменше 1 символ' })
    .max(200, { message: 'Заголовок не може перевищувати 200 символів' }),
  description: z
    .string()
    .max(1000, { message: 'Опис не може перевищувати 1000 символів' })
    .optional(),
  latitude: z
    .number()
    .min(-90, { message: 'Широта повинна бути ≥ -90' })
    .max(90, { message: 'Широта повинна бути ≤ 90' }),
  longitude: z
    .number()
    .min(-180, { message: 'Довгота повинна бути ≥ -180' })
    .max(180, { message: 'Довгота повинна бути ≤ 180' }),
  address: z.string().max(500, { message: 'Адреса не може перевищувати 500 символів' }).optional(),

  imageUrl: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() === '') {
        return undefined
      }
      return val
    },
    z.string().url({ message: 'Має бути дійсним URI' }).optional(),
  ),
})
