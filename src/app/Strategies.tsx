import { useState } from 'react';
import { Plus, ChevronRight, Upload, X, TrendingUp, Clock, Target } from 'lucide-react';

interface Strategy {
  id: number;
  name: string;
  market: string;
  timeframe: string;
  type: string;
  description: string;
  screenshots: string[];
  tradeCount: number;
  aiAnalysis?: {
    winRate: number;
    expectancy: number;
    riskConsistency: number;
    notes: string;
  };
}

const mockStrategies: Strategy[] = [
  {
    id: 1,
    name: '15-Minute Momentum Breakout',
    market: 'Forex',
    timeframe: '15m',
    type: 'Day Trading',
    description: 'Entry on momentum breakout with volume confirmation. Risk 1% per trade. Target 2:1 minimum.',
    screenshots: [],
    tradeCount: 24,
    aiAnalysis: {
      winRate: 68,
      expectancy: 1.85,
      riskConsistency: 87,
      notes: 'Strong performance during London session. Lower win rate on Fridays.'
    }
  },
  {
    id: 2,
    name: 'Supply & Demand Reversal',
    market: 'Stocks',
    timeframe: '1h',
    type: 'Swing Trading',
    description: 'Identify key supply/demand zones on higher timeframe. Enter on reversal confirmation.',
    screenshots: [],
    tradeCount: 15,
    aiAnalysis: {
      winRate: 72,
      expectancy: 2.1,
      riskConsistency: 92,
      notes: 'Excellent expectancy. Best results with tech stocks.'
    }
  },
  {
    id: 3,
    name: 'London Session Scalp',
    market: 'Forex',
    timeframe: '5m',
    type: 'Scalping',
    description: 'Quick scalps during London open volatility. Maximum 3 trades per session.',
    screenshots: [],
    tradeCount: 8,
  }
];

export default function Strategies() {
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    market: 'Forex',
    timeframe: '15m',
    type: 'Day Trading',
    description: ''
  });

  const handleAddStrategy = () => {
    if (!formData.name.trim()) return;

    const newStrategy: Strategy = {
      id: strategies.length + 1,
      name: formData.name,
      market: formData.market,
      timeframe: formData.timeframe,
      type: formData.type,
      description: formData.description,
      screenshots: screenshots,
      tradeCount: 0
    };

    setStrategies([newStrategy, ...strategies]);
    
    // Reset form
    setFormData({
      name: '',
      market: 'Forex',
      timeframe: '15m',
      type: 'Day Trading',
      description: ''
    });
    setScreenshots([]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setExpandedId(null);
    setFormData({
      name: '',
      market: 'Forex',
      timeframe: '15m',
      type: 'Day Trading',
      description: ''
    });
    setScreenshots([]);
  };

  const handleStrategyClick = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setIsAdding(false);
    }
  };

  const expandedStrategy = strategies.find(s => s.id === expandedId);

  return (
    <main className="p-6 min-h-screen flex items-center justify-center">
      {/* Strategy Notebook Container */}
      <div className="w-full max-w-[900px] mx-auto">
        <div 
          className="relative bg-gradient-to-br from-slate-900/40 to-slate-950/40 backdrop-blur-sm border border-white/10"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(100, 180, 255, 0.03)'
          }}
        >
          {/* Notebook Header */}
          <div className="border-b border-white/10 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white tracking-wide">STRATEGY NOTEBOOK</h1>
                <p className="text-sm text-slate-500 mt-1 font-light">{strategies.length} strategies documented</p>
              </div>
              <button
                onClick={() => {
                  setIsAdding(true);
                  setExpandedId(null);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all font-light text-sm tracking-wide"
              >
                <Plus size={16} strokeWidth={1.5} />
                ADD STRATEGY
              </button>
            </div>
          </div>

          {/* Add Strategy Form - Inline Expanded */}
          {isAdding && (
            <div className="border-b border-white/10 bg-slate-950/30 px-8 py-8 animate-in fade-in duration-300">
              <div className="space-y-6">
                {/* Strategy Name */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-light">
                    Strategy Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter strategy name"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-light"
                  />
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-light">
                      Market
                    </label>
                    <select
                      value={formData.market}
                      onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                      className="w-full bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-light text-sm"
                    >
                      <option value="Forex">Forex</option>
                      <option value="Stocks">Stocks</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Futures">Futures</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-light">
                      Timeframe
                    </label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-light text-sm"
                    >
                      <option value="1m">1m</option>
                      <option value="5m">5m</option>
                      <option value="15m">15m</option>
                      <option value="1h">1h</option>
                      <option value="4h">4h</option>
                      <option value="1d">1d</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-light">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-slate-900/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-light text-sm"
                    >
                      <option value="Scalping">Scalping</option>
                      <option value="Day Trading">Day Trading</option>
                      <option value="Swing Trading">Swing Trading</option>
                      <option value="Position Trading">Position Trading</option>
                    </select>
                  </div>
                </div>

                {/* Strategy Notes */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-light">
                    Strategy Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Document your strategy rules, entry criteria, risk management..."
                    rows={8}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-light leading-relaxed"
                  />
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-light">
                    Screenshots
                  </label>
                  <div className="border border-dashed border-white/20 p-6 hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload size={24} className="text-slate-600 mb-2" strokeWidth={1.5} />
                      <p className="text-sm text-slate-500 font-light">Click to upload screenshots</p>
                      <p className="text-xs text-slate-600 mt-1 font-light">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Placeholder */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full bg-slate-700/50" />
                    <div className="flex-1">
                      <h3 className="text-sm text-slate-500 uppercase tracking-wider mb-3 font-light">AI Analysis</h3>
                      <p className="text-sm text-slate-600 font-light leading-relaxed">
                        AI analysis will appear once trades are logged using this strategy
                      </p>
                      <div className="grid grid-cols-3 gap-4 mt-4 opacity-40">
                        <div className="border border-white/10 p-3">
                          <p className="text-xs text-slate-600 mb-1">Win Rate</p>
                          <p className="text-lg text-slate-500">—</p>
                        </div>
                        <div className="border border-white/10 p-3">
                          <p className="text-xs text-slate-600 mb-1">Expectancy</p>
                          <p className="text-lg text-slate-500">—</p>
                        </div>
                        <div className="border border-white/10 p-3">
                          <p className="text-xs text-slate-600 mb-1">Consistency</p>
                          <p className="text-lg text-slate-500">—</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors font-light text-sm tracking-wide"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleAddStrategy}
                    disabled={!formData.name.trim()}
                    className="px-6 py-2.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-light text-sm tracking-wide"
                  >
                    SAVE STRATEGY
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Expanded Strategy View */}
          {expandedId && expandedStrategy && (
            <div className="border-b border-white/10 bg-slate-950/30 px-8 py-8 animate-in fade-in duration-300">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-light text-white tracking-wide">{expandedStrategy.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-500 border border-white/10 px-2 py-1">
                        {expandedStrategy.market}
                      </span>
                      <span className="text-xs text-slate-500 border border-white/10 px-2 py-1">
                        {expandedStrategy.timeframe}
                      </span>
                      <span className="text-xs text-slate-500 border border-white/10 px-2 py-1">
                        {expandedStrategy.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-light">Strategy Description</h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {expandedStrategy.description}
                  </p>
                </div>

                {/* AI Analysis */}
                {expandedStrategy.aiAnalysis ? (
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-full bg-cyan-500/30" />
                      <div className="flex-1">
                        <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4 font-light">AI Analysis</h3>
                        
                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="border border-white/10 p-4 bg-slate-900/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Target size={14} className="text-cyan-400" strokeWidth={1.5} />
                              <p className="text-xs text-slate-500 uppercase tracking-wider">Win Rate</p>
                            </div>
                            <p className="text-2xl text-cyan-400 font-light">{expandedStrategy.aiAnalysis.winRate}%</p>
                          </div>
                          <div className="border border-white/10 p-4 bg-slate-900/30">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp size={14} className="text-cyan-400" strokeWidth={1.5} />
                              <p className="text-xs text-slate-500 uppercase tracking-wider">Expectancy</p>
                            </div>
                            <p className="text-2xl text-cyan-400 font-light">{expandedStrategy.aiAnalysis.expectancy}</p>
                          </div>
                          <div className="border border-white/10 p-4 bg-slate-900/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock size={14} className="text-cyan-400" strokeWidth={1.5} />
                              <p className="text-xs text-slate-500 uppercase tracking-wider">Consistency</p>
                            </div>
                            <p className="text-2xl text-cyan-400 font-light">{expandedStrategy.aiAnalysis.riskConsistency}%</p>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="border border-white/10 p-4 bg-slate-900/20">
                          <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {expandedStrategy.aiAnalysis.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-full bg-slate-700/50" />
                      <div className="flex-1">
                        <h3 className="text-sm text-slate-500 uppercase tracking-wider mb-3 font-light">AI Analysis</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">
                          AI analysis will appear once trades are logged using this strategy
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Strategy List */}
          <div className="divide-y divide-white/5">
            {strategies.length === 0 ? (
              <div className="px-8 py-16 text-center">
                <p className="text-slate-600 font-light">No strategies documented yet</p>
              </div>
            ) : (
              strategies.map((strategy) => (
                <button
                  key={strategy.id}
                  onClick={() => handleStrategyClick(strategy.id)}
                  className={`w-full px-8 py-5 flex items-center justify-between hover:bg-slate-900/30 transition-all group ${
                    expandedId === strategy.id ? 'bg-slate-900/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-6 flex-1 text-left">
                    {/* Strategy Name */}
                    <div className="flex-1">
                      <h3 className="text-white font-light tracking-wide mb-1">
                        {strategy.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">{strategy.tradeCount} trades</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 border border-white/10 px-3 py-1 font-light">
                        {strategy.market}
                      </span>
                      <span className="text-xs text-slate-500 border border-white/10 px-3 py-1 font-light">
                        {strategy.timeframe}
                      </span>
                    </div>

                    {/* AI Badge */}
                    {strategy.aiAnalysis && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-xs text-cyan-400 font-light">AI ANALYZED</span>
                      </div>
                    )}
                  </div>

                  {/* Expand Icon */}
                  <ChevronRight 
                    size={18} 
                    className={`text-slate-600 group-hover:text-cyan-400 transition-all ${
                      expandedId === strategy.id ? 'rotate-90' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))
            )}
          </div>

          {/* Notebook Footer */}
          <div className="border-t border-white/10 px-8 py-4">
            <p className="text-xs text-slate-600 font-light text-center tracking-wide">
              PROFESSIONAL TRADING JOURNAL • STRATEGY DOCUMENTATION
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
