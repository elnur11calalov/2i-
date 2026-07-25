import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { UserProfile } from '../types'
export const getProfile = async (uid: string) => (await getDoc(doc(db, 'users', uid))).data() as UserProfile | undefined
export const createProfile = async (profile: UserProfile) => {
  const data = { ...profile, createdAt: serverTimestamp() }
  await Promise.all([setDoc(doc(db, 'users', profile.uid), data), setDoc(doc(db, 'publicProfiles', profile.uid), data)])
}
