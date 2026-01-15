import { useState } from 'react';
import { 
  Plus,
  Filter,
  TrendingUp,
  ChevronDown,
  BarChart3,
  Target,
  Bell,
  Settings,
  User,
  Coffee
} from 'lucide-react';
import { AddTradeModal } from '@/app/components/AddTradeModal';

interface Trade {
  id: number;
  date: string;
  symbol: string;
  strategy: string;
  pnl: number;
  rr: number;
  emotion: string;
  score: number;
}

const initialTrades: Trade[] = [
  {
    id: 1,
    date: '13 Jan, 2026',
    symbol: 'USD',
    strategy: '15f',
    pnl: 8000.00,
    rr: 0.00,
    emotion: 'Confident',
    score: 100
  },
  {
    id: 2,
    date: '13 Jan, 2026',
    symbol: 'USD',
    strategy: '15f',
    pnl: 15000.00,
    rr: 3.00,
    emotion: 'Anxious',
    score: 40
  },
  {
    id: 3,
    date: '08 Jan, 2026',
    symbol: 'BTC',
    strategy: 'Position Trading',
    pnl: 100.00,
    rr: 2.50,
    emotion: 'Confident',
    score: 100
  },
  {
    id: 4,
    date: '08 Jan, 2026',
    symbol: 'BTC',
    strategy: 'Day Trading',
    pnl: 25.00,
    rr: 0.33,
    emotion: 'Confident',
    score: 90
  },
];

export default function Trades() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [strategyFilter, setStrategyFilter] = useState('All Strategies');
  const [emotionFilter, setEmotionFilter] = useState('All Emotions');

  const handleSaveTrade = (tradeData: any) => {
    // Calculate P&L
    const pnl = (parseFloat(tradeData.exitPrice) - parseFloat(tradeData.entryPrice)) * parseFloat(tradeData.quantity);
    const risk = Math.abs(parseFloat(tradeData.entryPrice) - parseFloat(tradeData.stopLoss)) * parseFloat(tradeData.quantity);
    const rr = risk > 0 ? Math.abs(pnl / risk) : 0;
    
    // Calculate score based on following rules
    let score = 50;
    if (tradeData.followedStrategy) score += 25;
    if (tradeData.followedRiskMgmt) score += 25;
    
    const newTrade: Trade = {
      id: trades.length + 1,
      date: new Date(tradeData.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      symbol: tradeData.symbol,
      strategy: tradeData.strategy,
      pnl: pnl,
      rr: rr,
      emotion: tradeData.emotion,
      score: score
    };
    
    setTrades([newTrade, ...trades]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score >= 50) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <>
      {/* Content */}
      <main className="p-6 max-w-[1800px] mx-auto">
        {/* Add Trade Button in Header */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg shadow-cyan-500/30 font-semibold"
          >
            <Plus size={20} />
            Add Trade
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-6 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:border-purple-500/50"
            >
              <option value="All Statuses" className="bg-slate-900">All Statuses</option>
              <option value="Win" className="bg-slate-900">Win</option>
              <option value="Loss" className="bg-slate-900">Loss</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
          </div>

          <div className="relative">
            <select
              value={strategyFilter}
              onChange={(e) => setStrategyFilter(e.target.value)}
              className="appearance-none px-6 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:border-purple-500/50"
            >
              <option value="All Strategies" className="bg-slate-900">All Strategies</option>
              <option value="15f" className="bg-slate-900">15f</option>
              <option value="Position Trading" className="bg-slate-900">Position Trading</option>
              <option value="Day Trading" className="bg-slate-900">Day Trading</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
          </div>

          <div className="relative">
            <select
              value={emotionFilter}
              onChange={(e) => setEmotionFilter(e.target.value)}
              className="appearance-none px-6 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:border-purple-500/50"
            >
              <option value="All Emotions" className="bg-slate-900">All Emotions</option>
              <option value="Confident" className="bg-slate-900">Confident</option>
              <option value="Anxious" className="bg-slate-900">Anxious</option>
              <option value="Calm" className="bg-slate-900">Calm</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Trades Table */}
        <div className="rounded-3xl backdrop-blur-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-white/5 bg-slate-950/40">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Date</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Symbol</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Strategy</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">P&L</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">R:R</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Emotion</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Score</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="grid grid-cols-7 gap-4 px-6 py-5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="text-gray-400">{trade.date}</div>
                <div className="text-white font-medium">{trade.symbol}</div>
                <div>
                  <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30">
                    {trade.strategy}
                  </span>
                </div>
                <div className={`font-semibold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                </div>
                <div className="text-white">{trade.rr.toFixed(2)}</div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  {trade.emotion}
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-lg text-sm border font-semibold ${getScoreColor(trade.score)}`}>
                    {trade.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Trade Modal */}
      <AddTradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrade}
      />
    </>
  );
}