import { 
  TrendingUp, 
  Brain, 
  Target, 
  Clock, 
  AlertTriangle,
  Award,
  DollarSign,
  Scale,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Mock data for Strategy Performance
const strategyData = [
  { 
    strategy: '15f Strategy', 
    netPnL: 12400, 
    winRate: 68, 
    expectancy: 1.85, 
    avgQuality: 87,
    trades: 45
  },
  { 
    strategy: 'Position Trading', 
    netPnL: 8200, 
    winRate: 72, 
    expectancy: 2.10, 
    avgQuality: 92,
    trades: 28
  },
  { 
    strategy: 'Day Trading', 
    netPnL: -1200, 
    winRate: 45, 
    expectancy: 0.85, 
    avgQuality: 62,
    trades: 52
  },
  { 
    strategy: 'Scalping', 
    netPnL: 5600, 
    winRate: 58, 
    expectancy: 1.42, 
    avgQuality: 75,
    trades: 86
  },
];

// Mock data for Emotion Impact
const emotionImpactData = [
  { emotion: 'Confident', winRate: 72, avgPnL: 285, avgRisk: 1.8, tradeQuality: 88 },
  { emotion: 'Calm', winRate: 68, avgPnL: 245, avgRisk: 1.5, tradeQuality: 85 },
  { emotion: 'Anxious', winRate: 42, avgPnL: -120, avgRisk: 2.8, tradeQuality: 55 },
  { emotion: 'FOMO', winRate: 35, avgPnL: -280, avgRisk: 3.5, tradeQuality: 42 },
  { emotion: 'Vengeful', winRate: 28, avgPnL: -450, avgRisk: 4.2, tradeQuality: 38 },
];

// Mock data for Risk vs Reward Efficiency (scatter plot)
const riskRewardData = [
  { risk: 0.5, rr: 3.2, pnl: 450, emotion: 'Confident' },
  { risk: 1.0, rr: 2.8, pnl: 320, emotion: 'Calm' },
  { risk: 1.2, rr: 2.5, pnl: 280, emotion: 'Confident' },
  { risk: 1.5, rr: 2.0, pnl: 200, emotion: 'Calm' },
  { risk: 2.0, rr: 1.8, pnl: 150, emotion: 'Anxious' },
  { risk: 2.5, rr: 1.2, pnl: -50, emotion: 'Anxious' },
  { risk: 3.0, rr: 0.8, pnl: -280, emotion: 'FOMO' },
  { risk: 3.5, rr: 0.5, pnl: -420, emotion: 'Vengeful' },
  { risk: 4.0, rr: 0.3, pnl: -550, emotion: 'Vengeful' },
  { risk: 0.8, rr: 3.5, pnl: 520, emotion: 'Confident' },
  { risk: 1.8, rr: 1.5, pnl: 80, emotion: 'Calm' },
  { risk: 2.8, rr: 0.9, pnl: -320, emotion: 'FOMO' },
];

// Mock data for Time-Based Performance
const dayOfWeekData = [
  { day: 'Mon', pnl: 1240, winRate: 65, trades: 12 },
  { day: 'Tue', pnl: 2150, winRate: 72, trades: 15 },
  { day: 'Wed', pnl: -580, winRate: 45, trades: 18 },
  { day: 'Thu', pnl: 3420, winRate: 78, trades: 14 },
  { day: 'Fri', pnl: 850, winRate: 58, trades: 16 },
];

const sessionData = [
  { session: 'Asia', pnl: 2400, winRate: 68, trades: 25 },
  { session: 'London', pnl: 4800, winRate: 75, trades: 32 },
  { session: 'NY', pnl: 1850, winRate: 62, trades: 28 },
];

// Mock data for Mistake Cost Analysis
const mistakeData = [
  { mistake: 'Over-risking', cost: 3420, count: 12 },
  { mistake: 'Poor R:R (<1)', cost: 2840, count: 18 },
  { mistake: 'Rule Violations', cost: 1920, count: 8 },
  { mistake: 'Emotional Trading', cost: 2650, count: 15 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl bg-slate-900/95 border border-white/10 p-4 rounded-xl shadow-2xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const totalMistakeCost = mistakeData.reduce((sum, item) => sum + item.cost, 0);
  const currentPnL = 9247;
  const potentialPnL = currentPnL + totalMistakeCost;

  return (
    <main className="p-6 max-w-[1800px] mx-auto">
      {/* 1️⃣ Strategy Performance Breakdown */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <TrendingUp className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Strategy Performance Breakdown</h2>
            <p className="text-sm text-gray-500">Which strategies work and which don't</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strategy Cards */}
          {strategyData.map((strategy, index) => (
            <div 
              key={strategy.strategy}
              className="p-6 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60 hover:border-purple-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{strategy.strategy}</h3>
                  <p className="text-xs text-gray-600">{strategy.trades} trades</p>
                </div>
                <div className={`px-3 py-1 rounded-lg text-sm font-bold ${
                  strategy.netPnL >= 0 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {strategy.netPnL >= 0 ? '+' : ''}{strategy.netPnL.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Win Rate</p>
                  <p className="text-xl font-bold text-cyan-400">{strategy.winRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Expectancy</p>
                  <p className="text-xl font-bold text-purple-400">{strategy.expectancy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg Quality</p>
                  <p className="text-xl font-bold text-pink-400">{strategy.avgQuality}</p>
                </div>
              </div>

              {/* Mini progress bar for quality */}
              <div className="mt-4">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${strategy.avgQuality}%`,
                      backgroundColor: strategy.avgQuality >= 80 ? '#10b981' : strategy.avgQuality >= 60 ? '#8b5cf6' : '#f59e0b',
                      boxShadow: `0 0 8px ${strategy.avgQuality >= 80 ? '#10b981' : strategy.avgQuality >= 60 ? '#8b5cf6' : '#f59e0b'}60`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2️⃣ Emotion Impact Analysis */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
            <Brain className="text-pink-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Emotion Impact Analysis</h2>
            <p className="text-sm text-gray-500">How your emotions affect your performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Win Rate by Emotion */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Win Rate by Emotion</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="emotion" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="winRate" radius={[8, 8, 0, 0]}>
                    {emotionImpactData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.winRate >= 65 ? '#10b981' : entry.winRate >= 50 ? '#f59e0b' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Avg P&L by Emotion */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Avg P&L by Emotion</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="emotion" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgPnL" radius={[8, 8, 0, 0]}>
                    {emotionImpactData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.avgPnL >= 0 ? '#10b981' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk and Trade Quality by Emotion */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Risk Taken by Emotion</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="emotion" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgRisk" radius={[8, 8, 0, 0]} fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade Quality by Emotion */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Trade Quality by Emotion</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={emotionImpactData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="emotion" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <PolarRadiusAxis stroke="#6b7280" style={{ fontSize: '10px' }} />
                  <Radar 
                    dataKey="tradeQuality" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3️⃣ Risk vs Reward Efficiency Map */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <Target className="text-cyan-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Risk vs Reward Efficiency Map</h2>
            <p className="text-sm text-gray-500">Are you taking smart risks or gambling?</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Risk % vs Reward Ratio</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400">Profitable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-400">Loss</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-400 uppercase tracking-wider">Danger Zone: High Risk + Low R:R</p>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  type="number" 
                  dataKey="risk" 
                  name="Risk %" 
                  stroke="#6b7280"
                  label={{ value: 'Risk %', position: 'insideBottom', offset: -10, fill: '#6b7280' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="rr" 
                  name="R:R" 
                  stroke="#6b7280"
                  label={{ value: 'Risk:Reward Ratio', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="backdrop-blur-xl bg-slate-900/95 border border-white/10 p-4 rounded-xl shadow-2xl">
                          <p className="text-white font-semibold mb-2">{data.emotion}</p>
                          <p className="text-sm text-gray-400">Risk: {data.risk}%</p>
                          <p className="text-sm text-gray-400">R:R: {data.rr}</p>
                          <p className={`text-sm font-semibold ${data.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            P&L: ${data.pnl}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Danger zone overlay */}
                <rect x="50%" y="50%" width="50%" height="50%" fill="#ef444420" />
                <Scatter name="Trades" data={riskRewardData}>
                  {riskRewardData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'}
                      opacity={0.8}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4️⃣ Time-Based Performance Analysis */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <Clock className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Time-Based Performance Analysis</h2>
            <p className="text-sm text-gray-500">When should you trade and when should you stop?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* P&L by Day of Week */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">P&L by Day of Week</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="pnl" radius={[8, 8, 0, 0]}>
                    {dayOfWeekData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Win Rate by Day */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Win Rate by Day</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dayOfWeekData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* P&L by Session */}
          <div className="lg:col-span-2 p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Performance by Trading Session</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sessionData.map((session, index) => (
                <div 
                  key={session.session}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{session.session}</h4>
                    <Calendar className="text-gray-600" size={20} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Net P&L</p>
                      <p className={`text-2xl font-bold ${session.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {session.pnl >= 0 ? '+' : ''}${session.pnl.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Win Rate</p>
                        <p className="text-lg font-bold text-cyan-400">{session.winRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Trades</p>
                        <p className="text-lg font-bold text-purple-400">{session.trades}</p>
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${session.winRate}%`,
                          backgroundColor: '#06b6d4',
                          boxShadow: '0 0 8px #06b6d460'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5️⃣ Mistake Cost Analysis */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mistake Cost Analysis 🔥</h2>
            <p className="text-sm text-gray-500">The real cost of bad behavior</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Impact Card */}
          <div className="p-8 rounded-3xl backdrop-blur-2xl border border-red-500/20 bg-gradient-to-br from-slate-900/60 to-slate-950/60 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-red-400" size={24} />
                <h3 className="text-lg font-bold text-white">Total Cost of Mistakes</h3>
              </div>
              <div className="mb-6">
                <p className="text-5xl font-bold text-red-400">-${totalMistakeCost.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-2">{mistakeData.reduce((sum, item) => sum + item.count, 0)} mistake trades</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-sm text-gray-400">Current P&L</span>
                  <span className="text-lg font-bold text-green-400">+${currentPnL.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="text-sm text-purple-300">Potential P&L</span>
                  <span className="text-lg font-bold text-purple-400">+${potentialPnL.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
                  <span className="text-sm text-amber-300">Improvement</span>
                  <span className="text-lg font-bold text-amber-400">+{((totalMistakeCost / currentPnL) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Mistakes Breakdown */}
          <div className="lg:col-span-2 p-8 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
            <h3 className="text-lg font-bold text-white mb-6">Mistake Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mistakeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    type="number" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="mistake" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    width={150}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cost" radius={[0, 8, 8, 0]} fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Mistake Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {mistakeData.map((mistake, index) => (
                <div 
                  key={mistake.mistake}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <p className="text-xs text-gray-600 mb-2">{mistake.mistake}</p>
                  <p className="text-xl font-bold text-red-400">-${mistake.cost}</p>
                  <p className="text-xs text-gray-500 mt-1">{mistake.count} times</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-6 p-8 rounded-3xl backdrop-blur-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900/60 to-slate-950/60">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Award className="text-amber-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">💡 Key Insights</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>If you followed your rules perfectly, your P&L would be <span className="text-purple-400 font-bold">${potentialPnL.toLocaleString()}</span> (+{((totalMistakeCost / currentPnL) * 100).toFixed(0)}%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>Your biggest leak is <span className="text-red-400 font-bold">{mistakeData[0].mistake}</span> costing you ${mistakeData[0].cost.toLocaleString()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>Focus on <span className="text-cyan-400 font-bold">risk management</span> and <span className="text-cyan-400 font-bold">emotional control</span> to unlock this hidden profit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
