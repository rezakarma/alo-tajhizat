import { z } from 'zod'

const schema = z.object({
    images: z.array(z.string()),
    title: z.string().min(3),
    description: z.string().min(3),
    brand: z.string(),
    details: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
      supplyType: z.enum(["sell", "rent", "sellRent"]),
      sellPrice: z.string().optional(),
      rentPrice: z.string().optional(),
      status: z.string(),
      category: z.string(),

})

export default schema 

