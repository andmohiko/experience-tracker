import { userCollection, type CreateUserDto } from '@engexp/common'
import { doc, setDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'

export const createUserOperation = async (uid: string, dto: CreateUserDto) => {
  await setDoc(doc(db, userCollection, uid), dto)
}
