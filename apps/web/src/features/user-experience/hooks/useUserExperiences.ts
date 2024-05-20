import { useEffect, useState } from 'react'
import type { Experience, UserId } from '@engexp/common'

import { subscribeMyExperiencesOperation } from '~/infrastructure/firestore/ExperienceOperations'

export const useUserExperiences = (userId: UserId): Array<Experience> => {
  const [experiences, setExperiences] = useState<Array<Experience>>([])

  useEffect(() => {
    const unsubscribe = subscribeMyExperiencesOperation(userId, setExperiences)

    return () => unsubscribe()
  }, [userId])

  return experiences
}
