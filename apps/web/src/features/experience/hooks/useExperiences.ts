import { useEffect, useState } from 'react'
import type { Experience } from '@engexp/common'

import { subscribeMyExperiencesOperation } from '~/infrastructure/firestore/ExperienceOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const useExperiences = () => {
  const { uid } = useFirebaseAuthContext()
  const [experiences, setExperiences] = useState<Array<Experience>>([])

  useEffect(() => {
    if (!uid) {
      return
    }

    const unsubscribe = subscribeMyExperiencesOperation(uid, setExperiences)

    return () => unsubscribe()
  }, [uid])

  return experiences
}
