import { Smile, Meh, Frown } from 'lucide-react';

interface EmotionStatusProps {
  status: 'positive' | 'neutral' | 'negative';
}

export function EmotionStatus({ status }: EmotionStatusProps) {
  const config = {
    positive: {
      icon: Smile,
      color: '#10b981',
      label: 'Confident',
      bg: 'rgba(16, 185, 129, 0.05)'
    },
    neutral: {
      icon: Meh,
      color: '#f59e0b',
      label: 'Neutral',
      bg: 'rgba(245, 158, 11, 0.05)'
    },
    negative: {
      icon: Frown,
      color: '#ef4444',
      label: 'Stressed',
      bg: 'rgba(239, 68, 68, 0.05)'
    }
  };

  const { icon: Icon, color, label, bg } = config[status];

  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-2xl border border-white/5"
      style={{ backgroundColor: bg }}
    >
      <div 
        className="p-3 rounded-full"
        style={{ 
          backgroundColor: `${color}15`,
          boxShadow: `0 0 20px ${color}20`
        }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <div className="text-xs text-gray-600 uppercase tracking-wide">Emotion Status</div>
        <div className="text-lg font-semibold text-white">{label}</div>
      </div>
    </div>
  );
}