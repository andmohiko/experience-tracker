import type { CreateExperienceInputType } from '~/features/my-experience/types'
import { timeStringToMinutes } from '~/utils/date'
import { createExperienceOperation } from '~/infrastructure/firestore/ExperienceOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { serverTimestamp } from '~/lib/firebase'

export const useCreateExperienceMutations = () => {
  const { uid } = useFirebaseAuthContext()
  const createExperience = async (data: CreateExperienceInputType) => {
    if (!uid) {
      throw new Error('ユーザー情報が取得できませんでした')
    }
    const minutes = timeStringToMinutes(data.time)

    await createExperienceOperation({
      createdAt: serverTimestamp,
      minutes,
      points: data.points,
      userId: uid,
    })
  }

  return {
    createExperience,
  }
}
