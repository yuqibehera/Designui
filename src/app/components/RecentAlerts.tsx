import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface Alert {
  id: number;
  type: 'success' | 'warning' | 'danger';
  message: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    type: 'success',
    message: 'Win streak of 5 trades achieved',
    time: '2m ago'
  },
  {
    id: 2,
    type: 'warning',
    message: 'Daily loss limit approaching 70%',
    time: '15m ago'
  },
  {
    id: 3,
    type: 'success',
    message: 'New profit milestone: $15,000',
    time: '1h ago'
  },
  {
    id: 4,
    type: 'danger',
    message: 'Risk-reward ratio below target',
    time: '2h ago'
  }
];

export function RecentAlerts() {
  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return <TrendingUp size={16} className="text-green-400" />;
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-400" />;
      case 'danger':
        return <TrendingDown size={16} className="text-red-400" />;
    }
  };

  const getColor = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500/20';
      case 'warning':
        return 'border-yellow-500/20';
      case 'danger':
        return 'border-red-500/20';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-3 p-3 rounded-xl backdrop-blur-2xl border ${getColor(alert.type)} bg-slate-950/60 hover:bg-slate-900/60 transition-colors duration-200`}
        >
          <div className="mt-0.5">{getIcon(alert.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-300">{alert.message}</p>
            <span className="text-xs text-gray-600">{alert.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}