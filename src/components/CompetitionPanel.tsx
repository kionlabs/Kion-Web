import React, { useState } from 'react';
import { Trophy, HelpCircle, Activity, Play, Star, Sparkles, ChevronRight, Swords } from 'lucide-react';

interface ContenderModel {
  name: string;
  provider: string;
  reasoning: number;
  coding: number;
  speed: number;
  costMetric: string;
  rank: number;
}

const MODELS: ContenderModel[] = [
  { name: 'Gemini 2.5 Pro Ultra', provider: 'Google Core', reasoning: 98, coding: 97, speed: 92, costMetric: '$$', rank: 1 },
  { name: 'Custom Finetuned 8B', provider: 'Nexus Local', reasoning: 86, coding: 90, speed: 98, costMetric: '$', rank: 3 },
  { name: 'Claude Opus v4', provider: 'Anthropic Inc', reasoning: 95, coding: 94, speed: 71, costMetric: '$$$', rank: 2 },
  { name: 'GPT-Alpha-Retro', provider: 'OpenAI Lab', reasoning: 91, coding: 88, speed: 85, costMetric: '$$', rank: 4 },
];

export default function CompetitionPanel() {
  const [modelA, setModelA] = useState<ContenderModel>(MODELS[0]);
  const [modelB, setModelB] = useState<ContenderModel>(MODELS[1]);
  const [arenaState, setArenaState] = useState<'idle' | 'simulating' | 'done'>('idle');
  const [duelScores, setDuelScores] = useState<{ scoreA: number; scoreB: number; category: string }[]>([]);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [winnerMessage, setWinnerMessage] = useState<string>('');

  const runModelDuel = () => {
    setArenaState('simulating');
    setDuelScores([]);
    setWinnerMessage('');
    
    const categories = [
      { name: 'Logical Reasoning', weight: 0.3, valA: modelA.reasoning, valB: modelB.reasoning },
      { name: 'Synthetic Code Speed', weight: 0.3, valA: modelA.coding, valB: modelB.coding },
      { name: 'Inference Velocity', weight: 0.2, valA: modelA.speed, valB: modelB.speed },
      { name: 'System Context Align', weight: 0.2, valA: Math.round(92 + Math.random() * 6), valB: Math.round(90 + Math.random() * 8) },
    ];

    const tempScores: { scoreA: number; scoreB: number; category: string }[] = [];
    
    // Stagger categories animation
    categories.forEach((cat, idx) => {
      setTimeout(() => {
        tempScores.push({
          category: cat.name,
          scoreA: cat.valA,
          scoreB: cat.valB,
        });
        setDuelScores([...tempScores]);
        setActiveCategoryIdx(idx);
      }, (idx + 1) * 800);
    });

    // Decisive result trigger
    setTimeout(() => {
      const totalA = categories.reduce((sum, c) => sum + c.valA * c.weight, 0);
      const totalB = categories.reduce((sum, c) => sum + c.valB * c.weight, 0);
      
      const winner = totalA > totalB ? modelA : modelB;
      const confidence = Math.abs(totalA - totalB).toFixed(1);

      setWinnerMessage(`🏆 Vector Duel Resolved. Winner: ${winner.name} (${winner.provider}) leads by ${confidence} points!`);
      setArenaState('done');
    }, (categories.length) * 850 + 400);
  };

  return (
    <div className="space-y-6 text-gray-300">
      <div className="border border-sacramento-light/40 bg-sacramento-dark/60 p-5 rounded-xl shadow-inner md:flex md:items-center md:gap-4">
        <div className="p-3 bg-sacramento-light/30 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-wide">AI Model Arena</h3>
          <p className="text-xs text-slate-400 mt-1">
            Systematic benchmark evaluations. Duel and stress-test competitive weights on reasoning thresholds, token throughput speeds, and accuracy matrix nodes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fighter Selectors */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center text-xs uppercase font-mono tracking-wider text-sacramento-bright font-bold">
            <span>Configure Fighters</span>
            <Swords className="w-4 h-4" />
          </div>

          <div className="grid grid-cols-2 gap-3 pb-1">
            {/* Fighter A selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 block uppercase">Fighter Left (A)</label>
              {MODELS.map((m) => (
                <button
                  key={`left-${m.name}`}
                  onClick={() => {
                    if (arenaState === 'simulating') return;
                    setModelA(m);
                    setArenaState('idle');
                    setDuelScores([]);
                  }}
                  disabled={m.name === modelB.name}
                  className={`w-full text-left p-2 rounded text-xs transition border font-mono ${
                    modelA.name === m.name
                      ? 'bg-sacramento-light/30 border-sacramento-bright text-white shadow'
                      : 'bg-sacramento-deep/50 border-sacramento-light/10 text-slate-500 hover:text-slate-300 disabled:opacity-30'
                  }`}
                >
                  <span className="font-bold block truncate">{m.name}</span>
                  <span className="text-[9px] text-slate-500 block">{m.provider}</span>
                </button>
              ))}
            </div>

            {/* Fighter B selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 block uppercase">Fighter Right (B)</label>
              {MODELS.map((m) => (
                <button
                  key={`right-${m.name}`}
                  onClick={() => {
                    if (arenaState === 'simulating') return;
                    setModelB(m);
                    setArenaState('idle');
                    setDuelScores([]);
                  }}
                  disabled={m.name === modelA.name}
                  className={`w-full text-left p-2 rounded text-xs transition border font-mono ${
                    modelB.name === m.name
                      ? 'bg-sacramento-light/30 border-sacramento-bright text-white shadow'
                      : 'bg-sacramento-deep/50 border-sacramento-light/10 text-slate-500 hover:text-slate-300 disabled:opacity-30'
                  }`}
                >
                  <span className="font-bold block truncate">{m.name}</span>
                  <span className="text-[9px] text-slate-500 block">{m.provider}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={runModelDuel}
            disabled={arenaState === 'simulating'}
            className="w-full bg-gradient-to-r from-sacramento-light to-sacramento-bright text-white font-mono font-bold py-2.5 rounded-lg text-xs hover:brightness-110 shadow-md transition disabled:opacity-50 cursor-pointer uppercase tracking-wider"
          >
            {arenaState === 'simulating' ? '🥊 EVALUATION RUNNING...' : '⚡ INITIATE DYNAMIC DUEL'}
          </button>
        </div>

        {/* Right Column: Comparative Duel Animation HUD */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-sacramento-deep border border-sacramento-light/35 rounded-xl p-4 flex-1 flex flex-col justify-between h-72">
            <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-sacramento-light/25 pb-2.5 mb-2">
              <span>ARENA RESOLVER MATRIX // L_LATITUDE_99</span>
              <span>{arenaState.toUpperCase()}</span>
            </div>

            {/* Head-to-Head HUD values */}
            <div className="grid grid-cols-2 gap-4 border-b border-sacramento-light/10 pb-3 mb-3 text-center text-xs font-mono">
              <div className="border-r border-sacramento-light/10 pr-2">
                <span className="text-sky-400 font-bold block truncate">{modelA.name}</span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">{modelA.provider}</span>
              </div>
              <div className="pl-2">
                <span className="text-amber-400 font-bold block truncate">{modelB.name}</span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">{modelB.provider}</span>
              </div>
            </div>

            {/* Battle category score progression */}
            <div className="flex-1 space-y-3.5 overflow-y-auto">
              {duelScores.length > 0 ? (
                duelScores.map((score, i) => (
                  <div key={score.category} className="space-y-1 bg-sacramento-dark/40 p-2 rounded border border-sacramento-light/15 animate-fade-in">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-300 mb-1">
                      <span>{score.category}</span>
                    </div>
                    {/* Progress slider bars */}
                    <div className="grid grid-cols-2 gap-4 font-mono text-[9px]">
                      {/* Model A bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-900 h-2 rounded overflow-hidden">
                          <div 
                            className="bg-sky-400 h-full rounded transition-all duration-700"
                            style={{ width: `${score.scoreA}%` }}
                          />
                        </div>
                        <span className="text-sky-300 font-bold text-right w-6">{score.scoreA}</span>
                      </div>

                      {/* Model B bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-900 h-2 rounded overflow-hidden">
                          <div 
                            className="bg-amber-400 h-full rounded transition-all duration-700"
                            style={{ width: `${score.scoreB}%` }}
                          />
                        </div>
                        <span className="text-amber-300 font-bold text-right w-6">{score.scoreB}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-3 opacity-60">
                  <Swords className="w-8 h-8 text-sacramento-light mb-2" />
                  <span className="text-xs font-mono text-slate-500 italic block">Combat queue empty.</span>
                  <span className="text-[10px] font-mono text-slate-600 mt-0.5 block">Select configurations and press "Initiate Dynamic Duel"</span>
                </div>
              )}
            </div>

            {/* Victor block summary banner */}
            {winnerMessage && (
              <div className="bg-sacramento-light/20 border border-sacramento-bright p-2.5 rounded-lg text-xs font-sans text-white text-center animate-fade-in mt-3">
                {winnerMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
