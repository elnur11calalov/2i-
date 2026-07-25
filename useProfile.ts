import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { UserProfile } from '../types'
export function useProfile(uid?: string) { const [profile, setProfile] = useState<UserProfile>(); const [loading, setLoading] = useState(true); useEffect(() => { if (!uid) { setLoading(false); return }; return onSnapshot(doc(db, 'users', uid), (snap) => { setProfile(snap.data() as UserProfile | undefined); setLoading(false) }) }, [uid]); return { profile, loading } }
