import { experienceCollection, type CreateExperienceDto } from '@engexp/common'
import { addDoc, collection } from 'firebase/firestore'

import { db } from '~/lib/firebase'

export const createExperienceOperation = async (dto: CreateExperienceDto) => {
  await addDoc(collection(db, experienceCollection), dto)
}
