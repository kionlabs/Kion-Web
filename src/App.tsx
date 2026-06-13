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
    title: 'AI 실무 리터러시 & 팀 성장 트랙',
    subtitle: '단순 학습을 넘어, 실무의 언어를 코딩하다',
    description: '사내 AI 환경 구축 정합성 설계 과정 및 자동화 워크숍 교육으로, 임직원의 실제 업무 가용 리터러시를 최대 92% 수준까지 가동시키는 트레이닝 연구실입니다.',
    tag: 'AI 실무 리터러시 트랙',
    stats: [
      { label: '임직원 학습 효율', value: '92% 향상' },
      { label: '업무 자동화 가동', value: '3배 속도 개선' },
      { label: '수강 피드백 만족', value: '98.2% 평치' }
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
    title: '커스텀 에이전트 & 통합 웹솔루션',
    subtitle: '상상을 실무 도구로 바꾸는 커스텀 엔진',
    description: '기업 수작업 병목 지점에 직결되는 1대1 맞춤 수작업 차단 백엔드 솔루션 및 데이터 연동 API 파이프라인 개발 엔진입니다.',
    tag: '커스텀 개발 스튜디오',
    stats: [
      { label: '맞춤 솔루션 아키텍처', value: '설계 완결' },
      { label: '업무 툴 API 연동', value: '무결 자동지향' },
      { label: '평균 개발 주기', value: '14일 MVP 완성' }
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
    title: '비즈니스 정밀 데이터 예측 분석기',
    subtitle: '감(感)이 아닌 데이터로 결정하는 전략',
    description: '검색 의도 마이닝, 블로그 및 플레이스 위치 데이터 정밀 매치, 24/7 이탈 흐름 분석을 통합 구사하여 비즈니스 의사 결정을 보증하는 원격 인텔리전스입니다.',
    tag: '예측 데이터 인텔리전스',
    stats: [
      { label: '블로그 가시성 지수', value: '82.4% 확보' },
      { label: '플레이스 전환 가동', value: 'CTR 4.85%' },
      { label: '인프라 대응력', value: '24/7 자율 추적' }
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
    title: 'AI 실증 개발 & 성공 매트릭스',
    subtitle: '승리하는 프로젝트를 만드는 메커니즘',
    description: '전국 공모전 연속 수상으로 검증된 초고속 MVP 프로토타이핑 설계와 가역 PoC를 활용해 완벽하게 승리하는 성과 정합성 제어 메커니즘입니다.',
    tag: '실전 MVP & PoC 빌더',
    stats: [
      { label: '공모전/아레나 승률', value: '100% 승격' },
      { label: 'MVP/PoC 제품 전환 타당', value: '100% 성공' },
      { label: '업무 연동 API 정밀성', value: '부하 0.02% 미만' }
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
  const educationRef = useRef<HTMLDivElement>(null);
  const developmentRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const competitionRef = useRef<HTMLDivElement>(null);

  const panelRefMap = {
    education: educationRef,
    development: developmentRef,
    analysis: analysisRef,
    competition: competitionRef
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
    let frameId: number;
    const interpolationLoop = () => {
      setMousePos(prev => {
        const dx = targetMousePos.x - prev.x;
        const dy = targetMousePos.y - prev.y;
        if (Math.abs(dx) < 0.0001 && Math.abs(dy) < 0.0001) {
          return prev;
        }
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08
        };
      });
      frameId = requestAnimationFrame(interpolationLoop);
    };
    frameId = requestAnimationFrame(interpolationLoop);
    return () => cancelAnimationFrame(frameId);
  }, [targetMousePos]);

  // Recalculates the static SVG connecting wire endpoints based on DOM metrics
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
        const panel = panels.find(p => p.id === key);
        if (panel) {
          const travelMultipliers = {
            foreground: -24,
            midground: -12,
            background: 4
          };
          const multiplier = travelMultipliers[panel.depth] * settings.parallaxStrength;
          
          // Reverse-engineer the static baseline panel center by subtracting active mouse-depth transforms
          const xParallax = mousePos.x * multiplier;
          const yParallax = mousePos.y * multiplier;

          const pxDynamic = pRect.left + pRect.width / 2 - parentRect.left;
          const pyDynamic = pRect.top + pRect.height / 2 - parentRect.top;

          const pxStatic = pxDynamic - xParallax;
          const pyStatic = pyDynamic - yParallax;

          coords[key] = { x1: cx, y1: cy, x2: pxStatic, y2: pyStatic };
        }
      }
    });
    setLineCoords(coords);
  };

  // Wire calculations bound ONLY to structural transitions/resizes (fully immune to mouse move thrashing!)
  useEffect(() => {
    recalculateWires();
    // Re-poll shortly to capture final positions after initial rendering and CSS stabilization
    const delayTimer = setTimeout(recalculateWires, 500);
    window.addEventListener('resize', recalculateWires);

    return () => {
      window.removeEventListener('resize', recalculateWires);
      clearTimeout(delayTimer);
    };
  }, [panels, settings.viewMode]);

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
            const staticCoords = lineCoords[key];
            if (!staticCoords) return null;

            const panel = panels.find(p => p.id === key);
            if (!panel) return null;

            const travelMultipliers = {
              foreground: -24,
              midground: -12,
              background: 4
            };
            const multiplier = travelMultipliers[panel.depth] * settings.parallaxStrength;
            const xParallax = mousePos.x * multiplier;
            const yParallax = mousePos.y * multiplier;

            const coords = {
              x1: staticCoords.x1,
              y1: staticCoords.y1,
              x2: staticCoords.x2 + xParallax,
              y2: staticCoords.y2 + yParallax
            };

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
                KION Labs 통합 지휘 관제탑 (KION LABS CORE)
              </h1>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sacramento-light/40 border border-sacramento-bright/35 text-sacramento-bright">
                KION v2.9
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">
              교육 및 공모전 관제 포털 // 새크라멘토 프리미엄 통합 인터페이스
            </p>
          </div>
        </div>

        {/* Dynamic State HUD Panel */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sacramento-bright animate-ping" />
            <span className="text-slate-400">워크숍 평점 (SAT):</span>
            <span className="text-emerald-400 font-bold">4.95 / 5.0</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-500">개발 완결 속도 (SPEED):</span>
            <span className="text-white font-bold">{(18 + (systemState.networkLatency % 3) * 0.1).toFixed(1)}일 완성</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">MVP 고속 전환율 (MVP):</span>
            <span className="text-white font-bold">{Math.round(92 + (systemState.cpuLoad / 10))}개 구축</span>
            <span className="text-[10px] text-slate-500">({(systemState.memoryUsage * 30).toFixed(0)}명 수료)</span>
          </div>

          <div className="flex items-center gap-1.5 border-l border-sacramento-light/40 pl-4">
            <span className="text-slate-500">관제 모드:</span>
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
                입체 홀로그램
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
                평면 그리드
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
                <span className="text-[10px] font-mono text-slate-600 block">Z // 원거리 배경 노드</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sacramento-bright" />
                {panels[0].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[0].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-3 gap-1 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[9px] font-mono leading-tight">
                {panels[0].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-500 block truncate" title={s.label}>{s.label}</span>
                    <span className="text-sacramento-bright font-extrabold block mt-0.5 truncate" title={s.value}>{s.value}</span>
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
                <span className="text-[10px] font-mono text-slate-600 block flex items-center">Z // 중간 스페이스 노드</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                {panels[1].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[1].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-3 gap-1 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[9px] font-mono leading-tight">
                {panels[1].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-500 block truncate" title={s.label}>{s.label}</span>
                    <span className="text-[#10b981] font-extrabold block mt-0.5 truncate" title={s.value}>{s.value}</span>
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
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-400/30 rounded-full mb-3 shadow-[0_0_12px_rgba(245,158,11,0.15)] text-[9.5px] text-amber-200 font-sans tracking-wider font-extrabold uppercase animate-pulse">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block" />
                시스템 중앙 관제센터
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-black text-white leading-tight tracking-tight uppercase font-sans">
                KION Labs <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-emerald-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] text-lg sm:text-xl md:text-2xl font-extrabold tracking-normal">AI 교육과 커스텀 개발의 통합 관제소</span>
              </h1>

              <p className="text-xs md:text-sm text-slate-400 mt-4 max-w-md mx-auto leading-relaxed font-sans font-medium font-bold">
                KION Labs가 지휘하는 차세대 교육 및 지능형 개발 환경으로, 구성원 맞춤 리터러시 훈련 트랙과 실무 자동화 에이전트 구축 프로세스를 한자리에서 조감 및 통제합니다.
              </p>

              {/* System trigger and core controls */}
              <div className="flex flex-wrap gap-3.5 mt-6 justify-center">
                <button
                  onClick={handleCalibrationSweep}
                  className="bg-white text-sacramento-deep px-5 py-2.5 rounded-lg text-xs font-sans font-extrabold tracking-wider hover:bg-sacramento-bright hover:shadow-glow transition-all active:scale-95 cursor-pointer uppercase"
                >
                  인프라 네트워크 망 보정
                </button>
                <button
                  onClick={() => alert(`KION Labs 관제 플랫폼 아키텍처:\n테마: 프리미엄 새크라멘토 그린 (#043927) & 골드 포인트\n대칭 방사형 3D 패널 배치 완료.\n마우스 움직임에 반응해 패럴랙스 심도가 자율 가변 조정됩니다.`)}
                  className="bg-sacramento-light/50 border border-sacramento-light text-slate-200 px-4 py-2.5 rounded-lg text-xs font-mono font-medium hover:bg-sacramento-light hover:text-white transition-all active:scale-95"
                >
                  시스템 상세 제어구조
                </button>
              </div>

              {/* Dynamic sliders for live telemetry alteration */}
              <div className="flex items-center gap-4 mt-6 bg-sacramento-dark/40 py-2.5 px-4 rounded-xl border border-sacramento-light/20 text-[10px] font-mono text-slate-500 w-full max-w-xs md:max-w-md">
                <Sliders className="w-4.5 h-4.5 text-sacramento-bright shrink-0" />
                <div className="flex-1 flex items-center justify-between gap-2">
                  <span className="truncate">마우스 반응형 패럴랙스 강도:</span>
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
                <span>위성에 마우스를 올리면 흐릿한 심도가 또렷해집니다. 클릭하면 디테일 분석 콘솔을 실행합니다.</span>
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
                <span className="text-[10px] font-mono text-slate-600 block">Z // 중간 스페이스 노드</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                {panels[3].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[3].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-3 gap-1 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[9px] font-mono leading-tight">
                {panels[3].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-500 block truncate" title={s.label}>{s.label}</span>
                    <span className="text-amber-400 font-extrabold block mt-0.5 truncate" title={s.value}>{s.value}</span>
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
                <span className="text-[10px] font-mono text-slate-600 block">Z // 밀착 전방 노드</span>
              </div>
              
              <h2 className="text-base font-display font-extrabold tracking-wide text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#10b981]" />
                {panels[2].title}
              </h2>
              
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {panels[2].description}
              </p>

              {/* Panel stats */}
              <div className="grid grid-cols-3 gap-1 mt-4 pt-3.5 border-t border-sacramento-light/20 text-[9px] font-mono leading-tight">
                {panels[2].stats.map(s => (
                  <div key={s.label}>
                    <span className="text-slate-500 block truncate" title={s.label}>{s.label}</span>
                    <span className="text-[#10b981] font-extrabold block mt-0.5 truncate" title={s.value}>{s.value}</span>
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
                KION Labs 자율 매트릭스
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase font-sans">
                KION Labs 통합 통제 센터
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                KION Labs의 대표적인 프로젝트 실무 사례, 교육 트랙 워크숍 정보, 실시간 인공지능 성능 벤치마크 모델 대결 및 원격 데이터 지표를 직관적으로 조감합니다.
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
                        <span className="text-[10px] text-slate-500 font-mono italic">세부 제어 가동</span>
                      </div>

                      <h3 className="text-base font-display font-extrabold text-white flex items-center gap-2">
                        {getModuleIcon(p.id)}
                        {p.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-5 pt-3 border-t border-sacramento-light/15 text-[9.5px] font-mono leading-tight">
                      {p.stats.map(s => (
                        <div key={s.label}>
                          <span className="text-slate-500 block truncate" title={s.label}>{s.label}</span>
                          <span className="text-[#10b981] font-bold block mt-0.5 truncate" title={s.value}>{s.value}</span>
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
                <span className="text-slate-400">보안 통제 콘솔 // 활성화 세션:</span>
                <span className="text-white font-bold uppercase tracking-wider bg-sacramento-light/25 px-2 py-0.5 rounded">
                  {panels.find(p => p.id === activePanelWorkspace)?.title}
                </span>
              </div>
              <button 
                onClick={() => setActivePanelWorkspace(null)}
                className="bg-sacramento-light/30 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 p-1.5 rounded-lg border border-sacramento-light/25 hover:border-rose-500/35 transition cursor-pointer flex items-center gap-1.5 font-sans font-bold text-[11px]"
              >
                <X className="w-4 h-4" />
                <span>관제 모듈 연결 닫기</span>
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
              <span>관제 암호화 보안 로그 계통 // 노드 ID: {activePanelWorkspace.toUpperCase()}_PIPELINE_ROUTING</span>
              <div className="flex gap-4">
                <span>통합 개발 속도 주기: {(18 + (systemState.networkLatency % 3) * 0.1).toFixed(1)}일 완성</span>
                <span>관제 지보 자원: KION Labs 클라우드 세션 정상 연결됨</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* COMPACT FOOTER COMMAND BOARD */}
      <footer className="w-full bg-sacramento-dark/95 border-t border-sacramento-light/40 backdrop-blur-md px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono z-25">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sacramento-bright" />
          <span>© 2026 KION Labs (키온 랩스) — 새크라멘토 플랫폼 시스템 디자인</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-white transition cursor-pointer">이용 정보 규정</span>
          <span className="hover:text-white transition cursor-pointer">개인정보 보안지침</span>
          <span className="hover:text-white transition cursor-pointer">네트워크 API 접근명세</span>
        </div>
      </footer>
    </div>
  );
}
