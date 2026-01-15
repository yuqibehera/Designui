import { Shield, TrendingUp, Scale, CheckSquare, Brain } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { value: 45 },
  { value: 52 },
  { value: 48 },
  { value: 65 },
  { value: 58 },
  { value: 72 },
  { value: 68 },
  { value: 75 },
  { value: 73 },
];

interface EdgeMetric {
  label: string;
  value: number;
  max: number;
  icon: any;
}

const metrics: EdgeMetric[] = [
  { label: 'Sample Size Reliability', value: 5, max: 25, icon: TrendingUp },
  { label: 'Expectancy Consistency', value: 25, max: 25, icon: Scale },
  { label: 'Rule Discipline', value: 25, max: 25, icon: CheckSquare },
  { label: 'Emotional Stability', value: 18, max: 25, icon: Brain },
];

export function EdgeStability() {
  const totalScore = 73;
  const maxScore = 100;
  const percentage = (totalScore / maxScore) * 100;

  const getStatusLabel = (score: number) => {
    if (score >= 80) return 'Strong Edge';
    if (score >= 60) return 'Developing Edge';
    return 'Building Edge';
  };

  const getStatusColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#06b6d4';
    return '#f59e0b';
  };

  const statusLabel = getStatusLabel(totalScore);
  const statusColor = getStatusColor(totalScore);

  return (
    <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Shield className="text-cyan-400" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Edge Stability Score</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Measures the reliability and repeatability of your trading edge.
          </p>
        </div>
        
        {/* Score Display */}
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-cyan-400">{totalScore}</span>
            <span className="text-2xl text-gray-600">/100</span>
          </div>
          <div 
            className="mt-1 px-3 py-1 rounded-full text-xs font-semibold inline-block"
            style={{ 
              backgroundColor: `${statusColor}20`,
              color: statusColor,
              border: `1px solid ${statusColor}40`
            }}
          >
            {statusLabel}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              backgroundColor: statusColor,
              boxShadow: `0 0 12px ${statusColor}60`
            }}
          />
        </div>
      </div>

      {/* Metrics Breakdown */}
      <div className="space-y-4 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const metricPercentage = (metric.value / metric.max) * 100;
          const isLow = metricPercentage < 50;
          
          return (
            <div key={metric.label} className="flex items-center justify-between group">
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-lg transition-colors ${
                  isLow ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/5 border border-white/10'
                }`}>
                  <Icon 
                    className={isLow ? 'text-amber-400' : 'text-gray-400'} 
                    size={16} 
                  />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg font-bold ${
                  isLow ? 'text-amber-400' : 'text-white'
                }`}>
                  {metric.value}
                </span>
                <span className="text-sm text-gray-600">/ {metric.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Chart */}
      <div className="h-16 -mx-4 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="edgeStabilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={statusColor} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={statusColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={statusColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#edgeStabilityGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Background glow */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: statusColor }}
      />
    </div>
  );
}
