import { formatDate } from '../../utils/date'
import type { DailyLog } from '../../types'
import TaskCard from './TaskCard'
export default function DayLog({ log, current, onToggle }: { log: DailyLog; current?: boolean; onToggle?: (task: 'task1' | 'task2') => void }) { return <section className="card"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">{current ? 'Bugün' : formatDate(log.date)}</h2>{current && <span className="text-sm text-slate-500">{formatDate(log.date)}</span>}</div><div className="space-y-3"><TaskCard label="1-ci İş" done={log.task1} onClick={() => onToggle?.('task1')} /><TaskCard label="2-ci İş" done={log.task2} onClick={() => onToggle?.('task2')} /></div></section> }
