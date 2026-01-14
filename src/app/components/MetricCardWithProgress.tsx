import { ReactNode } from 'react';

interface MetricCardWithProgressProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  percentage: number;
  subtitle?: string;
  color?: string;
}

export function MetricCardWithProgress({ 
  title, 
  value, 
  icon, 
  percentage,
  subtitle,
  color = '#8b5cf6'
}: MetricCardWithProgressProps) {
  const size = 140;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      className="relative p-6 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 overflow-hidden group hover:border-purple-500/20 transition-all duration-300"
      style={{
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 40px ${color}08`
      }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-3 flex items-center gap-2">
          {icon && <div className="text-purple-400/80">{icon}</div>}
          <span className="text-xs text-gray-500 uppercase tracking-wider">{title}</span>
        </div>
        
        {/* Circular Progress */}
        <div className="relative mb-4" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 12px ${color}80)`
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{value}</span>
            {subtitle && (
              <span className="text-xs text-gray-600 mt-1">{subtitle}</span>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <span className="text-sm font-semibold" style={{ color }}>{percentage}%</span>
        </div>
      </div>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
