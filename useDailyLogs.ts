import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { DailyLog } from '../types'
export function useDailyLogs(uid?: string) { const [logs, setLogs] = useState<DailyLog[]>([]); useEffect(() => { if (!uid) return; return onSnapshot(query(collection(db, 'users', uid, 'dailyLogs'), orderBy('date', 'desc')), (snapshot) => setLogs(snapshot.docs.map((item) => item.data() as DailyLog))) }, [uid]); const toggle = async (date: string, task: 'task1' | 'task2', current: DailyLog) => { if (!uid) return; await setDoc(doc(db, 'users', uid, 'dailyLogs', date), { date, task1: task === 'task1' ? !current.task1 : current.task1, task2: task === 'task2' ? !current.task2 : current.task2, updatedAt: serverTimestamp() }, { merge: true }) }; return { logs, toggle } }
