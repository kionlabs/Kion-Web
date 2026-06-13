import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  GraduationCap, 
  Activity, 
  Trophy, 
  Network, 
  X, 
  ChevronRight, 
  Info, 
  Sliders, 
  MousePointerClick,
  Check,
  RefreshCw,
  Orbit
} from 'lucide-react';
import EducationPanel from './components/EducationPanel';
import DevelopmentPanel from './components/DevelopmentPanel';
import AnalysisPanel from './components/AnalysisPanel';
import CompetitionPanel from './components/CompetitionPanel';
import { PanelData, SystemStatus, InterfaceSettings } from './types';

// Concrete initial dataset for the radial satellites
const INITIAL_PANELS: PanelData[] = [
  {
    id: 'education',
    title: 'AI Education Core',
    subtitle: 'Learning Curriculum & prompt lab',
    description: 'Empowering enterprise partners with custom training circuits, fine-tuning structures, and prompt sandbox environments.',
    tag: 'LEARNING LAB',
    stats: [
      { label: 'Enrolled', value: '1,420 Users' },
      { label: 'Skill Modules', value: '12 Dynamic' }
    ],
    depth: 'background',
    blur: 2.5,
    scale: 0.9,
    angle: 135, // NW
    xOffset: 12,
    yOffset: 15
  },
  {
    id: 'development',
    title: 'Custom Dev Studio',
    subtitle: 'Agent pipelines & code generation',
    description: 'Constructing scalable LLM orchestrations, semantic caching layers, and real-time custom API integrations.',
    tag: 'INTELLIGENT AGENTS',
    stats: [
      { label: 'Active Runtimes', value: '148 Nodes' },
      { label: 'Pipeline Health', value: '100.0%' }
    ],
    depth: 'midground',
    blur: 1.0,
    scale: 1.0,
    angle: 45, // NE
    xOffset: 62,
    yOffset: 15
  },
  {
    id: 'analysis',
    title: 'Analytical Insight Engine',
    subtitle: 'Data pipeline audits & telemetry',
    description: 'Tracking visual graph analyses, request throughput metrics, hourly spend charts, and code optimization suites.',
    tag: 'TELEMETRY HUBS',
    stats: [
      { label: 'Throughput', value: '1.2M req/hr' },
      { label: 'Latency Margin', value: '14ms Avg' }
    ],
    depth: 'foreground',
    blur: 0,
    scale: 1.1,
    angle: 315, // SE
    xOffset: 62,
    yOffset: 60
  },
  {
    id: 'competition',
    title: 'AI Arena Matrix',
    subtitle: 'Benchmark racing & duels',
    description: 'Simulating competitive model weights face-to-face across logic accuracy, speed factors, and reasoning sweeps.',
    tag: 'RACERS & ARENAS',
    stats: [
      { label: 'Live Tourneys', value: '31 Active' },
      { label: 'Top Contender', value: 'Gemini 2.5' }
    ],
    depth: 'midground',
    blur: 1.5,
    scale: 0.95,
    angle: 225, // SW
    xOffset: 12,
    yOffset: 60
  }
];

export default function App() {
  // UI and environment settings state
  const [panels, setPanels] = useState<PanelData[]>(INITIAL_PANELS);
  const [hoveredPanelId, setHoveredPanelId] = useState<string | null>(null);
  const [activePanelWorkspace, setActivePanelWorkspace] = useState<string | null>(null);
  
  // Custom HUD simulation values
  const [systemState, setSystemState] = useState<SystemStatus>({
    coreActive: true,
    cpuLoad: 7.4,
    memoryUsage: 41.2,
    networkLatency: 14,
    activeNodes: 4
  });

  const [settings, setSettings] = useState<InterfaceSettings>({
    parallaxStrength: 1.2,
    rotationSpeed: 1,
    isRotating: false,
    glowIntensity: 'medium',
    viewMode: '3D'
  });

  // Mouse coordinate management for 3D parallax offsets (-1 to +1 range)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMousePos, setTargetMousePos] = useState({ x: 0, y: 0 });

  // DOM elements tracking for reactive network lines
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const panelRefMap = {
    education: useRef<HTMLDivElement>(null),
    development: useRef<HTMLDivElement>(null),
    analysis: useRef<HTMLDivElement>(null),
    competition: useRef<HTMLDivElement>(null)
  };

  const [lineCoords, setLineCoords] = useState<{
    [key: string]: { x1: number; y1: number; x2: number; y2: number } | null;
  }>({ education: null, development: null, analysis: null, competition: null });

  // Dynamic status parameters simulation (Drifts values slightly every 3-4s to look alive)
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemState(prev => ({
        ...prev,
        cpuLoad: Math.max(2.1, Math.min(22.4, prev.cpuLoad + (Math.random() * 4 - 2))),
        memoryUsage: Math.max(38.0, Math.min(45.5, prev.memoryUsage + (Math.random() * 0.4 - 0.2))),
        networkLatency: Math.max(11, Math.min(18, prev.networkLatency + (Math.random() * 2 - 1)))
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Soft mouse lag interpolation for satisfyingly luxurious inertia physics
  useEffect(() => {
    const interpolationLoop = () => {
      setMousePos(prev => {
        const dx = targetMousePos.x - prev.x;
        const dy = targetMousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08
        };
      });
      requestAnimationFrame(interpolationLoop);
    };
    const frameId = requestAnimationFrame(interpolationLoop);
    return () => cancelAnimationFrame(frameId);
  }, [targetMousePos]);

  // Recalculates the SVG connecting wire endpoints reactively based on DOM metrics
  const recalculateWires = () => {
    if (!containerRef.current || !centerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const cRect = centerRef.current.getBoundingClientRect();

    const cx = cRect.left + cRect.width / 2 - parentRect.left;
    const cy = cRect.top + cRect.height / 2 - parentRect.top;

    const coords: typeof lineCoords = {};
    (Object.keys(panelRefMap) as Array<keyof typeof panelRefMap>).forEach(key => {
      const el = panelRefMap[key].current;
      if (el) {
        const pRect = el.getBoundingClientRect();
        const px = pRect.left + pRect.width / 2 - parentRect.left;
        const py = pRect.top + pRect.height / 2 - parentRect.top;
        coords[key] = { x1: cx, y1: cy, x2: px, y2: py };
      }
    });
    setLineCoords(coords);
  };

  // Wire calculations bound to transitions, drags, and resize sweeps
  useEffect(() => {
    recalculateWires();
    // Re-poll shortly to capture final positions after initial rendering and CSS stabilization
    const delayTimer = setTimeout(recalculateWires, 500);
    window.addEventListener('resize', recalculateWires);

    return () => {
      window.removeEventListener('resize', recalculateWires);
      clearTimeout(delayTimer);
    };
  }, [panels, settings.viewMode, mousePos]);

  // Handle tracking client bounding cursor coords
  const handleMouseMove = (e: React.MouseEvent) => {
    if (settings.viewMode === 'Compact') return;
    const { clientX, clientY } = e;
    // Normalized to range between -1.0 and 1.0 relative to page center
    const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    setTargetMousePos({ x, y });
  };

  // Resets coordinates and updates dynamic clock values
  const handleCalibrationSweep = () => {
    setSystemState(prev => ({
      ...prev,
      cpuLoad: 2.1,
      networkLatency: 11
    }));
    // Staggered light rotation reset animation
    setTargetMousePos({ x: 0, y: 0 });
    setMousePos({ x: 0, y: 0 });
    setTimeout(recalculateWires, 100);
  };

  // Compute actual translations for depth/parallax offsets
  const getPanelTransformStyle = (panel: PanelData) => {
    if (settings.viewMode === 'Compact') return {};

    // Baseline depths translate constraints
    const travelMultipliers = {
      foreground: -24,
      midground: -12,
      background: 4
    };

    const multiplier = travelMultipliers[panel.depth] * settings.parallaxStrength;
    const xParallax = mousePos.x * multiplier;
    const yParallax = mousePos.y * multiplier;

    // Hover prominence variables
    const isHovered = hoveredPanelId === panel.id;
    const scale = isHovered ? panel.scale * 1.05 : panel.scale;

    return {
      transform: `translate3d(${xParallax}px, ${yParallax}px, 0px) scale(${scale})`,
      transition: isHovered ? 'transform 150ms cubic-bezier(0.25, 1, 0.5, 1), filter 300ms' : 'transform 700ms cubic-bezier(0.1, 0.8, 0.2, 1), filter 400ms',
      filter: isHovered ? 'blur(0px)' : `blur(${panel.blur}px)`,
      zIndex: isHovered ? 40 : panel.depth === 'foreground' ? 30 : panel.depth === 'midground' ? 20 : 10
    };
  };

  return (
    <div 
      className="min-h-screen relative bg-sacramento-deep flex flex-col justify-between select-none overflow-x-hidden md:h-screen"
      style={{ fontFamily: 'var(--font-sans)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Matrix Scanline Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(13,92,66,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,66,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Soft spotlight behind center text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] aspect-square rounded-full bg-white/5 blur-[90px] animate-radial-spotlight pointer-events-none z-0" />

      {/* Primary SVG Connectors behind everything */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg className="w-full h-full" ref={containerRef}>
          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#043927" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {settings.viewMode === '3D' && lineCoords && Object.keys(lineCoords).map(key => {
            const coords = lineCoords[key];
            if (!coords) return null;

            const isHighlighted = hoveredPanelId === key;
            const strokeColor = isHighlighted ? '#10b981' : 'rgba(22, 91, 68, 0.45)';
            const strokeWidth = isHighlighted ? 2.0 : 1.0;

            return (
              <g key={`wire-${key}`}>
                {/* Visual Glow Layer on hover */}
                {isHighlighted && (
                  <line
                    x1={coords.x1}
                    y1={coords.y1}
                    x2={coords.x2}
                    y2={coords.y2}
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeOpacity="0.3"
                    filter="url(#glowFilter)"
                    className="transition-all duration-300"
                  />
                )}
                
                {/* Hard Connector Cable */}
                <line
                  x1={coords.x1}
                  y1={coords.y1}
                  x2={coords.x2}
                  y2={coords.y2}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="transition-all duration-300"
                />

                {/* Microscopic Pulse Ring Particle Node */}
                <line
                  x1={coords.x1}
                  y1={coords.y1}
                  x2={coords.x2}
                  y2={coords.y2}
                  stroke="rgba(16, 185, 129, 0.85)"
                  strokeWidth={strokeWidth * 1.5}
                  strokeDasharray="8 60"
                  className="animate-pulse-dash"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* TOP HEADER STATUS HUB */}
      <header className="w-full bg-sacramento-dark/95 border-b border-sacramento-light/40 backdrop-blur-md px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sacramento-light/30 rounded border border-sacramento-bright/40 text-sacramento-bright shadow-glow animate-pulse">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-display font-black uppercase tracking-wider text-white">
                NEXUS AI SYSTEMS
              </h1>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sacramento-light/40 border border-sacramento-bright/35 text-sacramento-bright">
                CON-TOWER v2.9
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">
              SECURE COMMAND PORTAL // SACRAMENTO LUXURY INTERFACE
            </p>
          </div>
        </div>

        {/* Dynamic State HUD Panel */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sacramento-bright animate-ping" />
            <span className="text-slate-400">CORE NETWORK:</span>
            <span className="text-emerald-400 font-bold">100% ONLINE</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-500">RTT:</span>
            <span className="text-white font-bold">{systemState.networkLatency}ms</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">CORE LOAD:</span>
            <span className="text-white font-bold">{systemState.cpuLoad.toFixed(1)}%</span>
            <span className="text-[10px] text-slate-500">({systemState.memoryUsage.toFixed(1)}GB)</span>
          </div>

          <div className="flex items-center gap-1.5 border-l border-sacramento-light/40 pl-4">
            <span className="text-slate-500">VIEW MODE:</span>
            <div className="flex rounded overflow-hidden border border-sacramento-light/45">
              <button
                onClick={() => {
                  setSettings(prev => ({ ...prev, viewMode: '3D' }));
                  setTimeout(recalculateWires, 300);
                }}
                className={`px-2 py-0.5 ${
                  settings.viewMode === '3D' 
                    ? 'bg-sacramento-bright text-sacramento-deep font-bold' 
                    : 'bg-sacramento-deep text-slate-400 hover:text-white'
                }`}
              >
                Hologram
              </button>
              <button
                onClick={() => {
                  setSettings(prev => ({ ...prev, viewMode: 'Compact' }));
                  setTimeout(recalculateWires, 300);
                }}
                className={`px-2 py-0.5 ${
                  settings.viewMode === 'Compact' 
                    ? 'bg-sacramento-bright text-sacramento-deep font-bold' 
                    : 'bg-sacramento-deep text-slate-400 hover:text-white'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN VIEW CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 md:py-0 relative flex items-center justify-center z-20">
        
        {/* Hologram Radial View Mode */}
        {settings.viewMode === '3D' ? (
          <div className="w-full h-full min-h-[500px] relative flex flex-col md:block items-center justify-center gap-8 py-10 md:py-0">
            
            {/* SATELLITE 1: AI Education (North-West) */}
            <div 
              id="node-education"
              ref={panelRefMap.education}
              onMouseEnter={() => setHoveredPanelId('education')}
              onMouseLeave={() => setHoveredPanelId(null)}
              onClick={() => setActivePanelWorkspace('education')}
              style={getPanelTransformStyle(panels[0])}
              className={`md:absolute md:left-[5%] md:top-[8%] w-full max-w-[320px] p-4.5 rounded-xl border transition-all cursor-pointer select-none ring-offset-2 ${
                hoveredPanelId === 'education'
                  ? 'bg-sacramento-dark border-sacramento-bright shadow-glow shadow-emerald-950 text-white'
                  : 'bg-sacramento-dark/75 border-sacramento-light/30 text-slate-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-sacramento-bright bg-sacramento-light/20 px-2 py-0.5 rounded font-black tracking-widest">
                  {panels[0].tag}
                </span>
                <span className="text-[10px] font-mono text-slate-600 block">Z // BACKGROUND (FAR)</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sacramento-bright" />
                {panels[0].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[0].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[10px] font-mono">
                {panels[0].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-600 block">{s.label}</span>
                    <span className="text-slate-300 font-bold block mt-0.5">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SATELLITE 2: Custom Development (North-East) */}
            <div 
              id="node-development"
              ref={panelRefMap.development}
              onMouseEnter={() => setHoveredPanelId('development')}
              onMouseLeave={() => setHoveredPanelId(null)}
              onClick={() => setActivePanelWorkspace('development')}
              style={getPanelTransformStyle(panels[1])}
              className={`md:absolute md:right-[5%] md:top-[8%] w-full max-w-[320px] p-4.5 rounded-xl border transition-all cursor-pointer select-none ${
                hoveredPanelId === 'development'
                  ? 'bg-sacramento-dark border-sacramento-bright shadow-glow shadow-emerald-950 text-white'
                  : 'bg-sacramento-dark/75 border-sacramento-light/30 text-slate-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-sacramento-light/20 px-2 py-0.5 rounded font-black tracking-widest">
                  {panels[1].tag}
                </span>
                <span className="text-[10px] font-mono text-slate-600 block flex items-center">Z // MIDGROUND</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                {panels[1].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[1].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[10px] font-mono">
                {panels[1].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-600 block">{s.label}</span>
                    <span className="text-slate-300 font-bold block mt-0.5">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTRAL TEXT CONSOLE BLOCK */}
            <div 
              ref={centerRef}
              id="system-core-beacon"
              className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-lg md:max-w-xl text-center px-4 py-8 pointer-events-auto z-20 flex flex-col items-center justify-center animate-float-slow"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sacramento-light/25 border border-sacramento-bright/40 rounded-full mb-3.5 shadow-glow text-[10px] text-white font-mono tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-sacramento-bright inline-block" />
                SYSTEM CENTRAL CONSOLE COGNITION
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-black text-white leading-tight tracking-tight uppercase">
                INTELLIGENT <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-emerald-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">NEXUS SYSTEM</span>
              </h1>

              <p className="text-xs md:text-sm text-slate-400 mt-4 max-w-md mx-auto leading-relaxed font-sans font-medium">
                Symmetrically orchestrating high-fidelity pipelines to empower local learning nodes, automated pipelines, visual audits, and arena tests.
              </p>

              {/* System trigger and core controls */}
              <div className="flex flex-wrap gap-3.5 mt-6 justify-center">
                <button
                  onClick={handleCalibrationSweep}
                  className="bg-white text-sacramento-deep px-5 py-2.5 rounded-lg text-xs font-sans font-extrabold tracking-wider hover:bg-sacramento-bright hover:shadow-glow transition-all active:scale-95 cursor-pointer uppercase"
                >
                  Calibrate System Wires
                </button>
                <button
                  onClick={() => alert(`AI Control Tower System Architecture:\nTheme: Sacramento Green (#043927)\nRadial satellites arranged symmetrically.\nMouse translation scales dynamically off mouse distances from the center.`)}
                  className="bg-sacramento-light/50 border border-sacramento-light text-slate-200 px-4 py-2.5 rounded-lg text-xs font-mono font-medium hover:bg-sacramento-light hover:text-white transition-all active:scale-95"
                >
                  SYSTEM SPECS
                </button>
              </div>

              {/* Dynamic sliders for live telemetry alteration */}
              <div className="flex items-center gap-4 mt-6 bg-sacramento-dark/40 py-2.5 px-4 rounded-xl border border-sacramento-light/20 text-[10px] font-mono text-slate-500 w-full max-w-xs md:max-w-md">
                <Sliders className="w-4.5 h-4.5 text-sacramento-bright shrink-0" />
                <div className="flex-1 flex items-center justify-between gap-2">
                  <span className="truncate">Orbital Parallax Strength:</span>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.1"
                    value={settings.parallaxStrength}
                    onChange={(e) => setSettings(prev => ({ ...prev, parallaxStrength: parseFloat(e.target.value) }))}
                    className="w-18 md:w-28 h-1 bg-sacramento-deep rounded-lg appearance-none cursor-pointer accent-sacramento-bright"
                  />
                  <span className="text-sacramento-bright font-bold">{settings.parallaxStrength.toFixed(1)}x</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-600 font-mono mt-4 flex items-center gap-1.5 justify-center">
                <MousePointerClick className="w-3 h-3 text-sacramento-bright animate-bounce" />
                <span>Hover satellites to sharpen depth; Click to engage workspace simulation</span>
              </div>
            </div>

            {/* SATELLITE 4: Competition (South-West) */}
            <div 
              id="node-competition"
              ref={panelRefMap.competition}
              onMouseEnter={() => setHoveredPanelId('competition')}
              onMouseLeave={() => setHoveredPanelId(null)}
              onClick={() => setActivePanelWorkspace('competition')}
              style={getPanelTransformStyle(panels[3])}
              className={`md:absolute md:left-[5%] md:bottom-[8%] w-full max-w-[320px] p-4.5 rounded-xl border transition-all cursor-pointer select-none ${
                hoveredPanelId === 'competition'
                  ? 'bg-sacramento-dark border-sacramento-bright shadow-glow shadow-emerald-950 text-white'
                  : 'bg-sacramento-dark/75 border-sacramento-light/30 text-slate-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-amber-400 bg-sacramento-light/20 px-2 py-0.5 rounded font-black tracking-widest">
                  {panels[3].tag}
                </span>
                <span className="text-[10px] font-mono text-slate-600 block">Z // MIDGROUND</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                {panels[3].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[3].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[10px] font-mono">
                {panels[3].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-600 block">{s.label}</span>
                    <span className="text-slate-300 font-bold block mt-0.5">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SATELLITE 3: Data Analysis (South-East) */}
            <div 
              id="node-analysis"
              ref={panelRefMap.analysis}
              onMouseEnter={() => setHoveredPanelId('analysis')}
              onMouseLeave={() => setHoveredPanelId(null)}
              onClick={() => setActivePanelWorkspace('analysis')}
              style={getPanelTransformStyle(panels[2])}
              className={`md:absolute md:right-[5%] md:bottom-[8%] w-full max-w-[320px] p-4.5 rounded-xl border transition-all cursor-pointer select-none ${
                hoveredPanelId === 'analysis'
                  ? 'bg-sacramento-dark border-sacramento-bright shadow-glow shadow-emerald-950 text-white'
                  : 'bg-sacramento-dark/75 border-sacramento-light/30 text-slate-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-[#10b981] bg-sacramento-light/20 px-2 py-0.5 rounded font-black tracking-widest">
                  {panels[2].tag}
                </span>
                <span className="text-[10px] font-mono text-slate-600 block">Z // FOREGROUND (CLOSER)</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#10b981]" />
                {panels[2].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[2].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[10px] font-mono">
                {panels[2].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-600 block">{s.label}</span>
                    <span className="text-slate-300 font-bold block mt-0.5">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          
          /* Linear Grid Matrix Compact Layout */
          <div className="w-full max-w-5xl md:py-10 space-y-8 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[10px] font-mono text-sacramento-bright uppercase tracking-widest bg-sacramento-light/20 px-3 py-1 rounded">
                Matrix Mode Grid Display
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase">
                INTELLIGENT COMMAND CONSOLE
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                A streamlined multi-module outline engineered to quickly review telemetry registers, run benchmark trials, test prompt behaviors, and construct server nodes on optimized Sacramento Green assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              {panels.map((p) => {
                const getModuleIcon = (id: string) => {
                  switch (id) {
                    case 'education': return <GraduationCap className="w-5 h-5 text-sacramento-bright" />;
                    case 'development': return <Terminal className="w-5 h-5 text-emerald-400" />;
                    case 'analysis': return <Activity className="w-5 h-5 text-[#10b981]" />;
                    case 'competition': return <Trophy className="w-5 h-5 text-amber-400" />;
                    default: return <Cpu className="w-5 h-5" />;
                  }
                };

                return (
                  <div 
                    key={p.id}
                    onClick={() => setActivePanelWorkspace(p.id)}
                    className="bg-sacramento-dark/85 border border-sacramento-light/40 p-5 rounded-xl hover:border-sacramento-bright shadow-md transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-sacramento-light/35 text-white/90 rounded tracking-wider">
                          {p.tag}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono italic">ENGAGE REGISTER</span>
                      </div>

                      <h3 className="text-base font-display font-extrabold text-white flex items-center gap-2">
                        {getModuleIcon(p.id)}
                        {p.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-sacramento-light/15 text-[10px] font-mono">
                      {p.stats.map(s => (
                        <div key={s.label}>
                          <span className="text-slate-500 block">{s.label}</span>
                          <span className="text-slate-300 font-bold block mt-0.5">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* FULL TERMINAL WORKSPACE POPUP MODAL */}
      {activePanelWorkspace && (
        <div className="fixed inset-0 bg-sacramento-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50 overflow-y-auto">
          <div className="bg-sacramento-dark/95 border border-sacramento-light/60 w-full max-w-5xl rounded-2xl shadow-glow overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
            
            {/* Modal HUD Bar */}
            <div className="bg-sacramento-deep px-5 py-4 border-b border-sacramento-light/50 flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sacramento-bright animate-pulse" />
                <span className="text-slate-400">SECURE CONSOLE TERMINAL // ACTIVE_MODULE:</span>
                <span className="text-white font-bold uppercase tracking-wider bg-sacramento-light/25 px-2 py-0.5 rounded">
                  {panels.find(p => p.id === activePanelWorkspace)?.title}
                </span>
              </div>
              <button 
                onClick={() => setActivePanelWorkspace(null)}
                className="bg-sacramento-light/30 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 p-1.5 rounded-lg border border-sacramento-light/25 hover:border-rose-500/35 transition cursor-pointer flex items-center gap-1.5 font-sans font-bold text-[11px]"
              >
                <X className="w-4 h-4" />
                <span>DISCONNECT SECTOR</span>
              </button>
            </div>

            {/* Dynamic Interactive Body Slot based on active workspace routing */}
            <div className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-sacramento-dark/80 to-sacramento-deep/90">
              {activePanelWorkspace === 'education' && <EducationPanel />}
              {activePanelWorkspace === 'development' && <DevelopmentPanel />}
              {activePanelWorkspace === 'analysis' && <AnalysisPanel />}
              {activePanelWorkspace === 'competition' && <CompetitionPanel />}
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="bg-sacramento-deep/50 px-5 py-3 border-t border-sacramento-light/20 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono text-slate-500">
              <span>SYSTEM ENCRYPTED LOG CHANNEL // ID: {activePanelWorkspace.toUpperCase()}_PIPELINE_ROUTING</span>
              <div className="flex gap-4">
                <span>SECTOR LATENCY: {systemState.networkLatency}ms</span>
                <span>STATE STATUS: CORE_CONNECTED</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* COMPACT FOOTER COMMAND BOARD */}
      <footer className="w-full bg-sacramento-dark/95 border-t border-sacramento-light/40 backdrop-blur-md px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono z-25">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sacramento-bright" />
          <span>© 2026 NEXUS COGNITIVE INC — SACRAMENTO PLATFORM DESIGN</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-white transition cursor-pointer">TERMS // NODE</span>
          <span className="hover:text-white transition cursor-pointer">PRIVACY // SECURE</span>
          <span className="hover:text-white transition cursor-pointer">API // ACCESS</span>
        </div>
      </footer>
    </div>
  );
}
