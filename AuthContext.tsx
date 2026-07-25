import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
interface AuthState { user: User | null; loading: boolean; login: () => Promise<void>; logout: () => Promise<void> }
const AuthContext = createContext<AuthState | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true); useEffect(() => onAuthStateChanged(auth, (current) => { setUser(current); setLoading(false) }), []); return <AuthContext.Provider value={{ user, loading, login: () => signInWithPopup(auth, googleProvider).then(() => undefined), logout: () => signOut(auth) }}>{children}</AuthContext.Provider> }
export const useAuth = () => { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within AuthProvider'); return context }
