import toast from 'react-hot-toast'
import DayLog from '../tasks/DayLog'
import { todayId } from '../../utils/date'
import { useDailyLogs } from '../../hooks/useDailyLogs'
import type { UserProfile, DailyLog } from '../../types'
export default function HomePage({ profile }: { profile: UserProfile }) { const { logs, toggle } = useDailyLogs(profile.uid); const today = todayId(); const current: DailyLog = logs.find((log) => log.date === today) ?? { date: today, task1: false, task2: false }; const change = async (task: 'task1' | 'task2') => { try { await toggle(today, task, current); toast.success(current[task] ? 'Qeyd silindi.' : 'Qeyd edildi!') } catch { toast.error('Qeyd yadda saxlanmadı.') } }; return <div className="space-y-5"><DayLog log={current} current onToggle={change} /><section><h2 className="mb-3 px-1 font-bold">Əvvəlki günlər</h2><div className="space-y-3">{logs.filter((log) => log.date !== today).length ? logs.filter((log) => log.date !== today).map((log) => <DayLog key={log.date} log={log} />) : <div className="card text-center text-sm text-slate-500">Əvvəlki günlər üçün hələ qeyd yoxdur.</div>}</div></section></div> }
