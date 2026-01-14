import { useState } from 'react';
import { Info } from 'lucide-react';

interface EmotionData {
  confidence: number;
  anxiety: number;
  anger: number;
  calm: number;
}

interface EmotionCoffeeCupProps {
  emotionScore: number; // 0-100
  emotionData?: EmotionData;
}

export function EmotionCoffeeCup({ 
  emotionScore = 75,
  emotionData = {
    confidence: 72,
    anxiety: 25,
    anger: 10,
    calm: 85
  }
}: EmotionCoffeeCupProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const getEmotionState = (score: number) => {
    if (score >= 80) return { label: 'Stable', color: '#10b981', steam: 'steady' };
    if (score >= 40) return { label: 'Moderate', color: '#f59e0b', steam: 'irregular' };
    return { label: 'Risk Alert', color: '#ef4444', steam: 'none' };
  };

  const state = getEmotionState(emotionScore);
  const fillHeight = (emotionScore / 100) * 140; // Max height of coffee in cup

  return (
    <div className="p-6 rounded-3xl backdrop-blur-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xs text-gray-600 uppercase tracking-wider mb-1">Emotion Snapshot</h3>
          <p className="text-sm font-semibold text-white">{state.label}</p>
        </div>
        <div 
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info size={16} className="text-gray-600 cursor-help" />
          
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute right-0 top-6 w-64 p-3 rounded-xl bg-slate-900 border border-white/10 backdrop-blur-2xl z-50 text-xs text-gray-400 shadow-2xl">
              <p className="mb-2">Represents your emotional balance and mental capital based on recent trading behavior.</p>
              <p className="text-gray-500">Full cup = stable • Half = moderate • Empty = risk alert</p>
            </div>
          )}
        </div>
      </div>

      {/* Coffee Cup and Emotion Bars */}
      <div className="flex items-center gap-8">
        {/* Coffee Cup Visualization */}
        <div className="relative flex-shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140" className="relative z-10">
            {/* Steam - only shows when score is good */}
            {emotionScore >= 40 && (
              <g opacity={emotionScore >= 80 ? "0.6" : "0.3"}>
                {/* Steam path 1 */}
                <path
                  d="M 40 20 Q 35 10, 40 0"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  className={emotionScore >= 80 ? "animate-steam-steady" : "animate-steam-irregular"}
                />
                {/* Steam path 2 */}
                <path
                  d="M 60 20 Q 55 10, 60 0"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  className={emotionScore >= 80 ? "animate-steam-steady" : "animate-steam-irregular"}
                  style={{ animationDelay: '0.5s' }}
                />
                {/* Steam path 3 */}
                <path
                  d="M 80 20 Q 85 10, 80 0"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  className={emotionScore >= 80 ? "animate-steam-steady" : "animate-steam-irregular"}
                  style={{ animationDelay: '1s' }}
                />
              </g>
            )}

            {/* Cup Body */}
            <defs>
              <linearGradient id="cupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(71, 85, 105, 0.4)" />
                <stop offset="100%" stopColor="rgba(51, 65, 85, 0.6)" />
              </linearGradient>
              
              <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={state.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={state.color} stopOpacity="0.5" />
              </linearGradient>
              
              {/* Shine effect */}
              <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>
            </defs>

            {/* Cup outer shape - wider coffee mug shape */}
            <path
              d="M 25 30 L 20 110 Q 60 120, 100 110 L 95 30 Z"
              fill="url(#cupGradient)"
              stroke="rgba(100, 116, 139, 0.3)"
              strokeWidth="1.5"
            />

            {/* Coffee fill - clipped to cup shape */}
            <clipPath id="cupClip">
              <path d="M 25.5 30 L 20.5 109 Q 60 119, 99.5 109 L 94.5 30 Z" />
            </clipPath>

            <g clipPath="url(#cupClip)">
              {/* Coffee liquid */}
              <rect
                x="20"
                y={110 - fillHeight}
                width="80"
                height={fillHeight}
                fill="url(#coffeeGradient)"
                className="transition-all duration-1000 ease-out"
              >
                <animate
                  attributeName="opacity"
                  values="0.9;1;0.9"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
              
              {/* Coffee surface shimmer */}
              <ellipse
                cx="60"
                cy={110 - fillHeight}
                rx="38"
                ry="6"
                fill="rgba(255, 255, 255, 0.15)"
                className="transition-all duration-1000 ease-out"
              >
                <animate
                  attributeName="opacity"
                  values="0.1;0.2;0.1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>

            {/* Cup rim highlight */}
            <ellipse
              cx="60"
              cy="30"
              rx="37"
              ry="6"
              fill="rgba(100, 116, 139, 0.2)"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
            />

            {/* Cup shine */}
            <rect
              x="26"
              y="35"
              width="15"
              height="60"
              fill="url(#shineGradient)"
              opacity="0.4"
            />

            {/* Handle - adjusted for wider cup */}
            <path
              d="M 95 45 Q 125 50, 125 80 Q 125 110, 100 105"
              fill="none"
              stroke="url(#cupGradient)"
              strokeWidth="10"
              opacity="0.6"
            />
            <path
              d="M 95 45 Q 125 50, 125 80 Q 125 110, 100 105"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="2"
            />
          </svg>

          {/* Glow effect based on state */}
          <div 
            className="absolute inset-0 blur-2xl opacity-30 transition-opacity duration-1000"
            style={{ 
              backgroundColor: state.color,
              transform: 'scale(0.8)'
            }}
          />
        </div>

        {/* Emotion Distribution Bars */}
        <div className="flex-1 space-y-3">
          {Object.entries(emotionData).map(([emotion, value]) => {
            const getBarColor = (em: string) => {
              switch(em) {
                case 'confidence': return '#8b5cf6';
                case 'anxiety': return '#f59e0b';
                case 'anger': return '#ef4444';
                case 'calm': return '#10b981';
                default: return '#6b7280';
              }
            };

            return (
              <div key={emotion}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-gray-600 capitalize">{emotion}</span>
                  <span className="text-xs font-semibold text-gray-400">{value}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${value}%`,
                      backgroundColor: getBarColor(emotion),
                      boxShadow: `0 0 8px ${getBarColor(emotion)}40`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score indicator */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Stability Score</span>
          <span 
            className="text-lg font-bold"
            style={{ color: state.color }}
          >
            {emotionScore}%
          </span>
        </div>
      </div>

      {/* Alert for low score */}
      {emotionScore < 40 && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
          <p className="text-xs text-red-400 font-medium">⚠️ Emotional Risk Alert - Consider taking a break</p>
        </div>
      )}
    </div>
  );
}