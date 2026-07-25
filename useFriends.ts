import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { FriendRequest } from '../types'
export function useIncomingRequests(uid?: string) { const [requests, setRequests] = useState<FriendRequest[]>([]); useEffect(() => { if (!uid) return; return onSnapshot(query(collection(db, 'friendRequests'), where('toUid', '==', uid), where('status', '==', 'pending'), orderBy('createdAt', 'desc')), (snapshot) => setRequests(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as FriendRequest))) }, [uid]); return requests }
export function useFriendIds(uid?: string) { const [ids, setIds] = useState<string[]>([]); useEffect(() => { if (!uid) return; return onSnapshot(query(collection(db, 'friendships'), where('members', 'array-contains', uid)), (snapshot) => setIds(snapshot.docs.map((item) => (item.data().members as string[]).find((member) => member !== uid)!).filter(Boolean))) }, [uid]); return ids }
