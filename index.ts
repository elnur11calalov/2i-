import type { Timestamp } from 'firebase/firestore'
export interface UserProfile { uid: string; displayName: string; photoURL: string | null; username: string; createdAt?: Timestamp }
export interface DailyLog { date: string; task1: boolean; task2: boolean; updatedAt?: Timestamp }
export interface FriendRequest { id: string; fromUid: string; toUid: string; fromName: string; fromPhotoURL: string | null; status: 'pending' | 'accepted' | 'rejected'; createdAt?: Timestamp }
