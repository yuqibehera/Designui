import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Award, 
  BarChart3,
  Coffee,
  Bell,
  Menu,
  Settings,
  User
} from 'lucide-react';
import { EquityCurve } from '@/app/components/EquityCurve';
import { MetricCardWithProgress } from '@/app/components/MetricCardWithProgress';
import { MiniBarChart } from '@/app/components/MiniBarChart';
import { EdgeStabilityChart } from '@/app/components/EdgeStabilityChart';
import { EmotionCoffeeCup } from '@/app/components/EmotionCoffeeCup';
import { RecentAlerts } from '@/app/components/RecentAlerts';
import { TradingHealth } from '@/app/components/TradingHealth';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 overflow-auto">
      {/* Animated background effect - more subtle and dark */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 backdrop-blur-3xl bg-slate-950/60 border-r border-white/5 z-50 hidden md:flex flex-col items-center py-6">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <TrendingUp className="text-white" size={24} />
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-6">
          <button className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 transition-colors text-purple-400">
            <BarChart3 size={24} />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-600 hover:text-purple-400">
            <Target size={24} />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-600 hover:text-purple-400">
            <Bell size={24} />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-600 hover:text-purple-400">
            <Settings size={24} />
          </button>
        </nav>

        <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-colors">
          <User className="text-gray-500" size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="md:ml-20 relative z-10">
        {/* Header */}
        <header className="backdrop-blur-3xl bg-slate-950/40 border-b border-white/5 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 rounded-lg hover:bg-white/5">
                <Menu className="text-gray-500" size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Trading Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, Trader</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }} />
                <span className="text-sm text-gray-400">Live</span>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Coffee className="text-purple-400/80 hover:text-purple-400 transition-colors" size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 max-w-[1800px] mx-auto">
          {/* Top Metrics Row with Circular Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCardWithProgress
              title="Net P&L"
              value="$9,247"
              icon={<DollarSign size={18} />}
              percentage={72}
              subtitle="+$342 today"
              color="#10b981"
            />
            <MetricCardWithProgress
              title="Trading Score"
              value="87.5"
              icon={<Award size={18} />}
              percentage={88}
              subtitle="Excellent"
              color="#8b5cf6"
            />
            <MetricCardWithProgress
              title="Expectancy"
              value="1.85"
              icon={<Target size={18} />}
              percentage={65}
              subtitle="Per trade"
              color="#ec4899"
            />
            <MetricCardWithProgress
              title="Win / Loss"
              value="86 / 41"
              icon={<TrendingUp size={18} />}
              percentage={68}
              subtitle="Win rate"
              color="#06b6d4"
            />
          </div>

          {/* Main Chart and Emotion Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Equity Curve - Takes 2 columns */}
            <div className="lg:col-span-2 p-8 rounded-3xl backdrop-blur-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Equity Curve</h2>
                  <p className="text-sm text-gray-600">Portfolio performance over time</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30 backdrop-blur-xl font-medium">1M</button>
                  <button className="px-4 py-2 rounded-xl bg-white/5 text-gray-500 text-sm hover:bg-white/10 transition-colors font-medium">3M</button>
                  <button className="px-4 py-2 rounded-xl bg-white/5 text-gray-500 text-sm hover:bg-white/10 transition-colors font-medium">1Y</button>
                </div>
              </div>
              <div className="h-[350px]">
                <EquityCurve />
              </div>
            </div>

            {/* Emotion Coffee Cup and Stats */}
            <div className="space-y-6">
              <EmotionCoffeeCup 
                emotionScore={75}
                emotionData={{
                  confidence: 72,
                  anxiety: 25,
                  anger: 10,
                  calm: 85
                }}
              />
            </div>
          </div>

          {/* Second Row - Charts and Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Trade Quality Chart */}
            <div className="p-6 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
              <h3 className="text-xs text-gray-600 uppercase tracking-wider mb-4">Avg Trade Quality</h3>
              <div className="h-[150px]">
                <MiniBarChart />
              </div>
            </div>

            {/* Edge Stability */}
            <div className="p-6 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
              <h3 className="text-xs text-gray-600 uppercase tracking-wider mb-4">Edge Stability</h3>
              <div className="h-[150px]">
                <EdgeStabilityChart />
              </div>
            </div>

            {/* Trading Health */}
            <div className="lg:col-span-2">
              <TradingHealth />
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Recent Alerts</h2>
                <p className="text-sm text-gray-600">Latest notifications and updates</p>
              </div>
              <Bell className="text-gray-600" size={20} />
            </div>
            <RecentAlerts />
          </div>
        </main>
      </div>
    </div>
  );
}