import { useState } from 'react';
import { X, Calendar, Paperclip } from 'lucide-react';

interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (trade: any) => void;
}

export function AddTradeModal({ isOpen, onClose, onSave }: AddTradeModalProps) {
  const [formData, setFormData] = useState({
    symbol: '',
    date: '2026-01-15',
    side: 'buy',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    stopLoss: '',
    strategy: '',
    emotion: '',
    notes: '',
    followedStrategy: true,
    followedRiskMgmt: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      symbol: '',
      date: '2026-01-15',
      side: 'buy',
      entryPrice: '',
      exitPrice: '',
      quantity: '',
      stopLoss: '',
      strategy: '',
      emotion: '',
      notes: '',
      followedStrategy: true,
      followedRiskMgmt: true,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl backdrop-blur-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-slate-950/95 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-3xl bg-slate-950/80 border-b border-white/5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Log New Trade</h2>
              <p className="text-sm text-gray-500">Enter the details of your trade. All fields are required.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Symbol and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Symbol</label>
              <input
                type="text"
                placeholder="e.g., AAPL, BTC/USD"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Side */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">Side</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="side"
                  value="buy"
                  checked={formData.side === 'buy'}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                  className="w-5 h-5 accent-cyan-500"
                />
                <span className="text-white">Buy</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="side"
                  value="sell"
                  checked={formData.side === 'sell'}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                  className="w-5 h-5 accent-cyan-500"
                />
                <span className="text-white">Sell</span>
              </label>
            </div>
          </div>

          {/* Entry, Exit, Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Entry Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="150.25"
                value={formData.entryPrice}
                onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Exit Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="155.75"
                value={formData.exitPrice}
                onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Quantity</label>
              <input
                type="number"
                step="0.01"
                placeholder="10"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                required
              />
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Stop Loss</label>
            <input
              type="number"
              step="0.01"
              placeholder="148.00"
              value={formData.stopLoss}
              onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
              required
            />
          </div>

          {/* Strategy and Emotion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Strategy</label>
              <select
                value={formData.strategy}
                onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-slate-900">- Unassigned -</option>
                <option value="15f" className="bg-slate-900">15f</option>
                <option value="Position Trading" className="bg-slate-900">Position Trading</option>
                <option value="Day Trading" className="bg-slate-900">Day Trading</option>
                <option value="Scalping" className="bg-slate-900">Scalping</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Emotion</label>
              <select
                value={formData.emotion}
                onChange={(e) => setFormData({ ...formData, emotion: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-slate-900">Select your emotion</option>
                <option value="Confident" className="bg-slate-900">Confident</option>
                <option value="Anxious" className="bg-slate-900">Anxious</option>
                <option value="Calm" className="bg-slate-900">Calm</option>
                <option value="Fearful" className="bg-slate-900">Fearful</option>
                <option value="Greedy" className="bg-slate-900">Greedy</option>
                <option value="Frustrated" className="bg-slate-900">Frustrated</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Notes</label>
            <textarea
              placeholder="Why did you take this trade? What was the context?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-xl resize-none"
            />
          </div>

          {/* Trade Screenshots */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Trade Screenshots</label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="screenshots"
              />
              <label
                htmlFor="screenshots"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:bg-white/10 hover:border-purple-500/30 transition-all backdrop-blur-xl cursor-pointer"
              >
                <Paperclip size={18} />
                <span>Choose Files</span>
                <span className="text-gray-600">No file chosen</span>
              </label>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={formData.followedStrategy}
                onChange={(e) => setFormData({ ...formData, followedStrategy: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded"
              />
              <span className="text-white">Did you follow your trading strategy?</span>
            </label>
            
            <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={formData.followedRiskMgmt}
                onChange={(e) => setFormData({ ...formData, followedRiskMgmt: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded"
              />
              <span className="text-white">Did you follow your risk management rules?</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg shadow-cyan-500/30 font-semibold"
            >
              Save Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
