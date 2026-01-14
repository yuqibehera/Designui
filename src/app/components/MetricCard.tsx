import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: 'up' | 'down';
  subtitle?: string;
  glowColor?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend,
  subtitle,
  glowColor = 'rgba(139, 92, 246, 0.2)'
}: MetricCardProps) {
  return (
    <div 
      className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
      style={{
        boxShadow: `0 8px 32px ${glowColor}`
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 uppercase tracking-wide">{title}</span>
          {icon && <div className="text-purple-400">{icon}</div>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          {trend && (
            <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          )}
        </div>
        {subtitle && (
          <span className="text-xs text-gray-500 mt-1 block">{subtitle}</span>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
