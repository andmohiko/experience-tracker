import type { FieldValue } from 'firebase/firestore'

import type { UserId } from './User'

export const experienceCollection = 'experiences'

export type ExperienceId = string

export type Experience = {
  experienceId: ExperienceId
  createdAt: Date
  minutes: number
  points: number
  userId: UserId
}

export type CreateExperienceDto = Omit<
  Experience,
  'experienceId' | 'createdAt'
> & {
  createdAt: FieldValue
}
