import { Activity } from 'lucide-react';

interface HealthMetric {
  label: string;
  value: number;
  color: string;
}

const metrics: HealthMetric[] = [
  { label: 'Discipline', value: 85, color: '#8b5cf6' },
  { label: 'Risk Mgmt', value: 78, color: '#ec4899' },
  { label: 'Consistency', value: 92, color: '#06b6d4' },
];

export function TradingHealth() {
  return (
    <div className="p-6 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-purple-400/80" size={20} />
        <h3 className="text-lg font-semibold text-white">Trading Health</h3>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">{metric.label}</span>
              <span className="text-sm font-semibold text-white">{metric.value}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${metric.value}%`,
                  backgroundColor: metric.color,
                  boxShadow: `0 0 10px ${metric.color}80`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}