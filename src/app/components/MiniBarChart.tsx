import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'W1', value: 65 },
  { name: 'W2', value: 72 },
  { name: 'W3', value: 58 },
  { name: 'W4', value: 85 },
  { name: 'W5', value: 78 },
  { name: 'W6', value: 68 },
];

export function MiniBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          stroke="#475569" 
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
        />
        <YAxis hide />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={index % 2 === 0 ? '#8b5cf6' : '#a855f7'}
              opacity={0.9}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}