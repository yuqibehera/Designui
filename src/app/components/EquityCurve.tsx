import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: 'Jan', equity: 10000, baseline: 10000 },
  { time: 'Feb', equity: 11200, baseline: 10000 },
  { time: 'Mar', equity: 10800, baseline: 10000 },
  { time: 'Apr', equity: 12500, baseline: 10000 },
  { time: 'May', equity: 13800, baseline: 10000 },
  { time: 'Jun', equity: 15200, baseline: 10000 },
  { time: 'Jul', equity: 14600, baseline: 10000 },
  { time: 'Aug', equity: 16800, baseline: 10000 },
  { time: 'Sep', equity: 18200, baseline: 10000 },
  { time: 'Oct', equity: 19500, baseline: 10000 },
];

export function EquityCurve() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.6}/>
              <stop offset="50%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            stroke="#475569" 
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#1e293b' }}
          />
          <YAxis 
            stroke="#475569" 
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#1e293b' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.95)', 
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              color: '#fff',
              backdropFilter: 'blur(20px)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="equity" 
            stroke="url(#lineGradient)" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorEquity)" 
            strokeLinecap="round"
            strokeLinejoin="round"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}