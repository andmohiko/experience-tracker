import { userCollection } from '@engexp/common'
import type { User, CreateUserDto } from '@engexp/common'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumn = ['createdAt', 'updatedAt']

export const subscribeUserById = (
  userId: string,
  setter: (data: User) => void,
) => {
  const unsubscribe = onSnapshot(doc(db, userCollection, userId), (doc) => {
    const data = doc.data()
    if (!data) {
      return undefined
    }
    const user = {
      userId: doc.id,
      ...convertDate(data, dateColumn),
    } as User
    setter(user)
  })
  return unsubscribe
}

export const createUserOperation = async (uid: string, dto: CreateUserDto) => {
  await setDoc(doc(db, userCollection, uid), dto)
}
