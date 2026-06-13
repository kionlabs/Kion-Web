import React, { useState, useEffect } from 'react';
import { Activity, Play, RefreshCw, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface TelemetryPoint {
  label: string;
  latency: number; // millisecond response
  throughput: number; // req/sec
  cost: number; // millicents
}

const SHIFT_DATA: TelemetryPoint[] = [
  { label: '08:00', latency: 420, throughput: 110, cost: 42 },
  { label: '10:00', latency: 490, throughput: 180, cost: 72 },
  { label: '12:00', latency: 680, throughput: 280, cost: 112 },
  { label: '14:00', latency: 510, throughput: 220, cost: 84 },
  { label: '16:00', latency: 390, throughput: 190, cost: 68 },
  { label: '18:00', latency: 310, throughput: 120, cost: 44 },
  { label: '20:00', latency: 290, throughput: 95, cost: 35 },
];

export default function AnalysisPanel() {
  const [dataPoints, setDataPoints] = useState<TelemetryPoint[]>(SHIFT_DATA);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [efficiencyRating, setEfficiencyRating] = useState<number>(84.2);
  const [currentMetric, setCurrentMetric] = useState<'latency' | 'throughput' | 'cost'>('latency');
  const [activeCounter, setActiveCounter] = useState<number>(14202);

  // Slow drift simulated load
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCounter(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const runSweepOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate complex background calculations
    setTimeout(() => {
      setDataPoints(prev => prev.map(pt => ({
        ...pt,
        latency: Math.floor(pt.latency * 0.72), // reduce latency by 28%
        cost: Math.floor(pt.cost * 0.85) // reduce cost by 15%
      })));
      setEfficiencyRating(96.8);
      setIsOptimizing(false);
    }, 1500);
  };

  const handleReset = () => {
    setDataPoints(SHIFT_DATA);
    setEfficiencyRating(84.2);
  };

  // High-value visual calculations helper for custom SVG Sparkline
  const maxVal = Math.max(...dataPoints.map(d => d[currentMetric]));
  const minVal = Math.min(...dataPoints.map(d => d[currentMetric]));
  const valueRange = maxVal - minVal || 1;

  // Render variables
  const paddingY = 20;
  const paddingX = 40;
  const chartHeight = 150;
  const chartWidth = 500;

  // Convert points to SVG coords
  const svgPoints = dataPoints.map((pt, i) => {
    const x = paddingX + (i / (dataPoints.length - 1)) * (chartWidth - paddingX * 2);
    const val = pt[currentMetric];
    const y = chartHeight - paddingY - ((val - minVal) / valueRange) * (chartHeight - paddingY * 2);
    return { x, y, label: pt.label, val };
  });

  const pathD = svgPoints.length > 0 
    ? `M ${svgPoints[0].x} ${svgPoints[0].y} ` + svgPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') 
    : '';

  const areaD = svgPoints.length > 0
    ? `${pathD} L ${svgPoints[svgPoints.length - 1].x} ${chartHeight - paddingY} L ${svgPoints[0].x} ${chartHeight - paddingY} Z`
    : '';

  return (
    <div className="space-y-6 text-gray-300">
      <div className="border border-sacramento-light/40 bg-sacramento-dark/60 p-5 rounded-xl shadow-inner md:flex md:items-center md:gap-4">
        <div className="p-3 bg-sacramento-light/30 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-wide">AI Analytical Insight Engine</h3>
          <p className="text-xs text-slate-400 mt-1">
            Real-time server telemetry tracking latency curves, model performance anomalies, and optimization routing parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metric Selectors and Key stats */}
        <div className="lg:col-span-4 space-y-4">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-sacramento-bright font-bold block mb-1">
              Select Core Telemetry Stream
            </span>
            {(['latency', 'throughput', 'cost'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setCurrentMetric(metric)}
                className={`w-full text-left p-2.5 rounded text-xs transition border font-mono flex justify-between items-center ${
                  currentMetric === metric
                    ? 'bg-sacramento-light/40 border-sacramento-bright text-white shadow-md'
                    : 'bg-sacramento-deep/50 border-sacramento-light/20 hover:border-sacramento-light text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="capitalize">{metric === 'cost' ? 'Inference Spend (cents)' : metric === 'latency' ? 'Inbound Latency (ms)' : 'Total Throughput (ops/s)'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          <div className="bg-sacramento-dark/90 p-4 rounded-lg border border-sacramento-light/25 space-y-3.5 font-mono">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5 border-b border-sacramento-light/20 pb-2">
              <Cpu className="w-4 h-4" /> Telemetry HUD
            </h4>
            
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Pipeline Efficiency:</span>
              <span className="text-white font-bold">{efficiencyRating}%</span>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Hourly Queries:</span>
              <span className="text-emerald-400 font-bold">{activeCounter.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Node Speed Profile:</span>
              <span className="text-white font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Interactive Sparkline / Area Chart */}
        <div className="lg:col-span-8 space-y-4 flex flex-col">
          <div className="bg-sacramento-deep border border-sacramento-light/35 rounded-xl p-4 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-sacramento-light/20 pb-3 mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Hourly Metric: <span className="text-white capitalize font-bold">{currentMetric}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={runSweepOptimization}
                  disabled={isOptimizing}
                  className="bg-sacramento-bright text-sacramento-deep hover:bg-white text-xs px-3.5 py-1.5 rounded font-sans font-bold flex items-center gap-1 transition disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isOptimizing ? 'animate-spin' : ''}`} />
                  {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-sacramento-light/20 hover:bg-sacramento-light/40 text-slate-300 text-[11px] px-2 py-1 rounded font-mono transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Custom Responsive SVG Chart Area */}
            <div className="relative w-full flex-1 flex items-center justify-center p-2 min-h-[160px]">
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = paddingY + ratio * (chartHeight - paddingY * 2);
                  return (
                    <line 
                      key={idx}
                      x1={paddingX} 
                      y1={y} 
                      x2={chartWidth - paddingX} 
                      y2={y} 
                      stroke="#165b44" 
                      strokeWidth="0.5" 
                      strokeDasharray="4 4" 
                    />
                  );
                })}

                {/* Underfill Area */}
                {areaD && (
                  <path 
                    d={areaD} 
                    fill="url(#chartGradient)" 
                    className="transition-all duration-500"
                  />
                )}

                {/* Sparkline Path */}
                {pathD && (
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2.5" 
                    className="transition-all duration-500"
                  />
                )}

                {/* Outer Markers / Nodes */}
                {svgPoints.map((pt, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="4.5" 
                      fill="#01110b" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                      className="transition-all duration-500 hover:scale-150"
                    />
                    {/* Tooltip on hover */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-black duration-200"
                    >
                      {pt.val}
                    </text>
                  </g>
                ))}

                {/* X-Axis labels */}
                {svgPoints.map((pt, i) => (
                  <text 
                    key={i}
                    x={pt.x} 
                    y={chartHeight - 4} 
                    textAnchor="middle" 
                    fill="#475569" 
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {pt.label}
                  </text>
                ))}
              </svg>
            </div>
          </div>
          
          <div className="bg-sacramento-light/10 border border-sacramento-light/20 p-3 rounded-lg flex items-center gap-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-sacramento-bright shrink-0" />
            <span>
              <strong>Note on Sweep:</strong> Initiating an active optimization cycle triggers a code-compactor routine that merges redundant API endpoints, safely dropping overall latencies by approximately 25-30%.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
