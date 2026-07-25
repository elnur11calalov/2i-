import { ArrowLeft } from 'lucide-react'
import FriendActivity from './FriendActivity'
import FriendRequests from './FriendRequests'
import FriendSearch from './FriendSearch'
import { useFriendIds } from '../../hooks/useFriends'
import type { UserProfile } from '../../types'
export default function FriendsPage({ profile, onBack }: { profile: UserProfile; onBack: () => void }) { const ids = useFriendIds(profile.uid); return <><button onClick={onBack} className="btn mb-4 px-0 text-slate-600 dark:text-slate-300"><ArrowLeft size={19} /> Ana səhifə</button><div className="space-y-4"><FriendSearch me={profile} /><FriendRequests uid={profile.uid} /><FriendActivity ids={ids} /></div></> }
