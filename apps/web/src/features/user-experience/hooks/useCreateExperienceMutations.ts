import type { User, UserId } from '@engexp/common'
import { useEffect, useState } from 'react'

import { subscribeUserById } from '~/infrastructure/firestore/UserOperations'

export const useUser = (userId: UserId) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeUserById(userId, setUser)
    return () => unsubscribe()
  }, [userId])

  return user
}
