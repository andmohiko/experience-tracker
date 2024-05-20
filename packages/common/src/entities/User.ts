import type { FieldValue } from 'firebase/firestore'

import type { Uid } from './Auth'

export const userCollection = 'users'

export type UserId = Uid

export type User = {
  userId: UserId
  createdAt: Date
  email: string
  username: string
  updatedAt: Date
}

export type CreateUserDto = Omit<User, 'userId' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}
