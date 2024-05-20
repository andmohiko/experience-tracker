import { z } from 'zod'

export const createExperienceSchema = z.object({
  points: z.number(),
  time: z.string(),
})

export type CreateExperienceInputType = z.infer<typeof createExperienceSchema>
