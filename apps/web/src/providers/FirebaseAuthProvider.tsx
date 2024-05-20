import type { User } from 'firebase/auth'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react'

import { useToast } from '~/hooks/useToast'
import { createUserOperation } from '~/infrastructure/firestore/UserOperations'
import { auth, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

const FirebaseAuthContext = createContext<{
  currentUser: User | null
  uid: string | null
  signUp: (email: string, password: string) => void
  logout: () => Promise<void>
}>({
  currentUser: null,
  uid: null,
  signUp: async () => {},
  logout: async () => {},
})

const FirebaseAuthProvider = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [uid, setUid] = useState<string | null>(null)
  const { push } = useRouter()
  const { showErrorToast } = useToast()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        setUid(user.uid)
      } else {
        setCurrentUser(null)
        setUid(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const signUp = useCallback(
    async (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user

          // Firestoreにドキュメント作成
          await createUserOperation(user.uid, {
            createdAt: serverTimestamp,
            email,
            updatedAt: serverTimestamp,
            username: email.split('@')[0],
          })

          push('/')
        })
        .catch((e) => {
          showErrorToast(errorMessage(e))
        })
    },
    [push, showErrorToast],
  )

  const logout = useCallback(async () => {
    await signOut(auth)
  }, [])

  return (
    <FirebaseAuthContext.Provider value={{ currentUser, uid, signUp, logout }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
