import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { time: '1', value: 45 },
  { time: '2', value: 52 },
  { time: '3', value: 48 },
  { time: '4', value: 65 },
  { time: '5', value: 58 },
  { time: '6', value: 72 },
  { time: '7', value: 68 },
  { time: '8', value: 75 },
];

export function EdgeStabilityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="edgeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="time" 
          stroke="#475569" 
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
        />
        <YAxis hide />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#06b6d4" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#edgeGradient)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}