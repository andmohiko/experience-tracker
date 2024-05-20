import { experienceCollection } from '@engexp/common'
import type { Experience, CreateExperienceDto } from '@engexp/common'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumn = ['createdAt']

export const subscribeMyExperiencesOperation = (
  userId: string,
  setter: (data: Array<Experience>) => void,
) => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, experienceCollection),
      where('userId', '==', userId),
      // where('createdAt', '>=', new Date('2024-05-01'),
      orderBy('createdAt', 'desc'),
    ),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data()
        return {
          experienceId: doc.id,
          ...convertDate(docData, dateColumn),
        } as Experience
      })
      setter(data)
    },
  )

  return unsubscribe
}

export const createExperienceOperation = async (dto: CreateExperienceDto) => {
  await addDoc(collection(db, experienceCollection), dto)
}
