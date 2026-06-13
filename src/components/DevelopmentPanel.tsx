import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Workflow, 
  Settings, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Database, 
  Layers, 
  Rocket, 
  Gauge, 
  ExternalLink,
  Milestone,
  CheckCircle2,
  WorkflowIcon
} from 'lucide-react';

interface RoadmapStep {
  phase: string;
  title: string;
  tag: string;
  duration: string;
  description: string;
  deliverables: string[];
  color: string;
}

interface CompletedProject {
  id: string;
  client: string;
  title: string;
  category: string;
  description: string;
  stats: { label: string; value: string; trend: string }[];
  techs: string[];
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    phase: '1단계',
    title: '요구 분석 & 아키텍처 설계',
    tag: 'DISCOVERY',
    duration: '평균 3~5일',
    description: '고객사 현업 수작업 병목 지점을 포착하고, 도입 가용 API 자원 검증과 실무 맞춤형 데이터 흐름 로직을 구체적으로 도식화합니다.',
    deliverables: ['업무 병목 진단 보고서', '맞춤 아키텍처 다이어그램', 'API 정합성 테스트 결과'],
    color: 'border-sacramento-bright'
  },
  {
    phase: '2단계',
    title: '초고속 MVP 프로토타입 구현',
    tag: 'PROTOTYPING',
    duration: '평균 7~10일',
    description: '동작 가능한 최소 기능 단위(MVP)를 단숨에 빚어내어 현업 담당자의 실시간 인터랙션 피드백 루프를 수집하고 설계를 보정합니다.',
    deliverables: ['작동형 실시간 MVP 인터페이스', '핵심 지능 연동 검증 시연', 'UI/UX 조정 수렴본'],
    color: 'border-amber-400'
  },
  {
    phase: '3단계',
    title: '최종 이식 및 프로덕션 런칭',
    tag: 'LAUNCHING',
    duration: '평균 3~5일',
    description: '기존 업무 메일, 노션, 스프레드시트, 슬랙과 무결 통합하며 사내 클라우드 인프라 호스팅 및 임직원 대상 활용 실증 트레이닝을 지원합니다.',
    deliverables: ['실운영 배포 클라우드 컨테이너', '통합 시스템 연계 안정화', '활용 가이드 & 인수인계'],
    color: 'border-[#10b981]'
  }
];

const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: 'p1',
    client: '글로벌 유통사 K사',
    title: '실시간 주문 퍼널 AI 시맨틱 추적 엔진',
    category: '맞춤형 웹/앱 솔루션',
    description: '산재된 고객 주문서의 맥락을 AI 탐색기로 분류하고 입고 지연 요소를 실시간 자동 경고하는 맞춤 대시보드 시스템.',
    stats: [
      { label: '개발 주기', value: '14일 완성', trend: '68% 단축' },
      { label: '데이터 처리량', value: '4.2x 증가', trend: '오류율 0%' },
      { label: '수작업 시간', value: '주당 24시간 절감', trend: '자동 수집화' }
    ],
    techs: ['React', 'PostgreSQL', 'Gemini API', 'Tailwind']
  },
  {
    id: 'p2',
    client: '마케팅 대행 H그룹',
    title: '다차원 키워드 발굴 및 플레이스 퍼널 자동화 허브',
    category: '데이터 연동 자동화',
    description: '여러 마케팅 채널과 플레이스 데이터 분석 경쟁 현황을 API로 융합, 성과 기여 키워드를 완전 자동 분류 및 유포하는 백엔드 파이프라인.',
    stats: [
      { label: '모니터링 주기', value: '5분 실시간화', trend: '기존 24시간' },
      { label: '임직원 생산성', value: '3.5배 향상', trend: '보고서 자동화' },
      { label: '연동 파이프라인', value: '8개 API 융합', trend: '무결 동기' }
    ],
    techs: ['NodeJS', 'Google API', 'PostgreSQL', 'Slack Bot']
  },
  {
    id: 'p3',
    client: '특허 법률 사무소 S사',
    title: '특허 문서 시맨틱 자동 마이닝 & 알림 에이전트',
    category: '맞춤형 웹/앱 솔루션',
    description: '매일 발행되는 관련 법률 개정 정보 및 유사 특허 청구항의 언기 시맨틱을 추출, 의뢰 대상과 자동 매칭 및 일괄 발송하는 에이전트.',
    stats: [
      { label: '유사 특허 분류', value: '98.5% 정확도', trend: '휴먼 매치 능가' },
      { label: '문서 마이닝 속도', value: '건당 1.2초', trend: '기존 35분' },
      { label: '알림 도달 가동', value: '실시간 발송', trend: '카카오톡 연계' }
    ],
    techs: ['LangChain', 'Python Fast API', 'Postgres Vector', 'NextJS']
  }
];

export default function DevelopmentPanel() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  const selectedProject = COMPLETED_PROJECTS[activeProjectIdx];

  return (
    <div className="space-y-6 text-gray-300">
      {/* Top Professional Header */}
      <div className="relative border border-sacramento-light/40 bg-gradient-to-r from-sacramento-dark/95 to-sacramento-deep/95 p-6 rounded-xl shadow-lg md:flex md:items-center md:gap-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sacramento-bright/5 rounded-full blur-3xl pointer-events-none" />
        <div className="p-3 bg-sacramento-light/30 border border-sacramento-bright/35 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0 shadow-md shrink-0">
          <Cpu className="w-8 h-8 text-sacramento-bright" />
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-sacramento-light/40 border border-sacramento-bright/35 text-[10px] font-mono font-bold text-sacramento-bright tracking-wider mb-1 uppercase">
            <Settings className="w-3" /> CUSTOM ENGINEERING WITH MAXIMUM SPEED
          </div>
          <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight font-sans">
            상상을 실무 도구로 바꾸는 커스텀 엔진
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-4xl">
            가치 창출로 바로 직결되는 고성능 통합 맞춤 가동 아키텍처. KION Labs는 개념 증명 수준에 머무르는 프로토타입에서 한발 더 나아가, 실무진이 매일 활짝 열어 두고 사용하는 무결하고 안정적인 상용 툴을 압도적인 완결 속도로 공급합니다.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Development Roadmap Timeline & Right Completed Projects Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Custom Development Roadmap timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright flex items-center gap-2">
              <Milestone className="w-4 h-4 text-sacramento-bright" /> KION Labs 고속 애자일 개발 로드맵
            </span>
            <span className="text-[10px] font-mono text-slate-500">클릭하여 각 단계별 인도물 확인</span>
          </div>

          {/* Timeline Process Pipeline UI */}
          <div className="grid grid-cols-3 gap-3">
            {ROADMAP_STEPS.map((step, idx) => {
              const order = idx + 1;
              const isSelected = activeStep === order;
              return (
                <button
                  key={step.phase}
                  onClick={() => setActiveStep(order)}
                  className={`relative p-3.5 rounded-xl border text-left transition duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-sacramento-dark/90 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                      : 'bg-sacramento-deep/30 border-sacramento-light/10 text-slate-400 hover:border-sacramento-light/30 hover:bg-sacramento-light/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-mono font-bold tracking-widest ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                      {step.phase} // {step.tag}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                  <h4 className="text-xs md:text-sm font-black text-white mt-1.5 font-sans truncate">
                    {step.title.split(' & ')[0]}
                  </h4>
                  <span className="text-[10.5px] font-mono text-slate-500 block mt-1">{step.duration}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Detailed Roadmap Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-sacramento-dark/80 border border-sacramento-light/25 rounded-2xl p-6 h-[256px] flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                    {activeStep}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-black text-white font-sans tracking-tight">
                      {ROADMAP_STEPS[activeStep - 1].title}
                    </h4>
                    <p className="text-[10px] font-mono text-amber-200 uppercase tracking-widest font-bold">
                      {ROADMAP_STEPS[activeStep - 1].tag} PHASE · {ROADMAP_STEPS[activeStep - 1].duration}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl font-medium">
                  {ROADMAP_STEPS[activeStep - 1].description}
                </p>

                {/* Key Deliverables Block */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">// 각 단계별 산출 인도물 리스트</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {ROADMAP_STEPS[activeStep - 1].deliverables.map((item, id) => (
                      <div key={id} className="flex items-center gap-2 bg-sacramento-deep/40 px-3 py-1.5 rounded border border-sacramento-light/10 text-[11px] text-slate-300 font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-sacramento-bright shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Bar Footer inside Milestone */}
              <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center border-t border-sacramento-light/10 pt-3">
                <span className="flex items-center gap-1">
                  <Workflow className="w-3.5 h-3.5 text-sacramento-bright" />
                  <span>KION Labs 애자일 엔지니어링 표준 프로세스 준수</span>
                </span>
                <span>가동 정합성 지표: 최우수(A+)</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Core Strength Display (2 dynamic capability blocks) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-sacramento-deep/40 border border-sacramento-light/10 hover:border-sacramento-bright/40 transition duration-300 rounded-xl p-4 space-y-2 relative">
              <div className="absolute top-4 right-4 text-sacramento-bright opacity-30">
                <Layers className="w-7 h-7" />
              </div>
              <span className="text-[9.5px] font-mono font-bold text-sacramento-bright bg-sacramento-light/20 px-2 py-0.5 rounded tracking-widest uppercase">CORE CAPABILITY</span>
              <h4 className="text-xs md:text-sm font-bold text-white font-sans tracking-tight">맞춤형 웹/앱 솔루션 개발</h4>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                조직 비즈니스 흐름을 정밀 역추적하여, UI 기획 설계부터 클라우드 인프라 배포까지, 단 하나의 가용 병목도 흐르지 않게 최적화한 커스텀 소프트웨어를 공급합니다.
              </p>
            </div>

            <div className="bg-sacramento-deep/40 border border-sacramento-light/10 hover:border-amber-400/30 transition duration-300 rounded-xl p-4 space-y-2 relative">
              <div className="absolute top-4 right-4 text-amber-400 opacity-30">
                <Database className="w-7 h-7" />
              </div>
              <span className="text-[9.5px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded tracking-widest uppercase">DATA INTEGRATION</span>
              <h4 className="text-xs md:text-sm font-bold text-white font-sans tracking-tight">데이터 연동 자동화 & 지능 융합</h4>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                이미 활발하게 소유 중인 노션, 이메일, 스프레드시트, 슬랙 등의 원천 데이터 리소스를 최신 AI 모델과 API 레벨로 연결하여 빈틈없는 인텔리전트 전송 도구를 구축합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Completed Projects Dashboard Showcase (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-sacramento-bright" /> 완료 프로젝트 & 핵심 성능 대시보드
            </span>
          </div>

          <div className="bg-sacramento-dark/90 border border-sacramento-light/25 rounded-2xl p-4 space-y-4 h-[448px] flex flex-col justify-between">
            {/* Minimal Project Tabs */}
            <div className="space-y-1.5">
              <div className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
                <span>PROJECT SELECTION</span>
                <span>실제 구축 사례 (3개 선택 가능)</span>
              </div>
              <div className="flex gap-1 bg-sacramento-deep/30 p-1 rounded-lg border border-sacramento-light/10">
                {COMPLETED_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`flex-1 py-1 px-1.5 text-center text-[10px] font-sans font-bold transition rounded cursor-pointer truncate ${
                      activeProjectIdx === idx
                        ? 'bg-sacramento-bright text-white shadow-sm'
                        : 'bg-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {proj.client.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Project Main Information display card */}
            <div className="bg-sacramento-deep/40 rounded-xl p-3.5 border border-sacramento-light/10 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-sacramento-bright bg-sacramento-light/15 px-2 py-0.5 rounded font-extrabold uppercase">
                    {selectedProject.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedProject.client}</span>
                </div>
                <h4 className="text-sm font-black text-white font-sans tracking-tight">
                  {selectedProject.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal font-sans">
                  {selectedProject.description}
                </p>
              </div>

              {techList(selectedProject.techs)}
            </div>

            {/* Visual Indicators Dashboard for Selected Project KPIs */}
            <div className="space-y-2">
              <span className="text-[9.5px] font-mono text-slate-500 block uppercase font-bold tracking-wider">
                // 프로젝트 도입 핵심 성능 수치지표 (KPIs)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {selectedProject.stats.map((stat, idx) => (
                  <div key={idx} className="bg-sacramento-deep/50 p-2.5 rounded-lg border border-sacramento-light/10 text-center relative overflow-hidden">
                    <span className="text-[9px] text-slate-500 block truncate">{stat.label}</span>
                    <span className="text-xs md:text-sm font-black text-white block mt-1 truncate">{stat.value}</span>
                    <span className="text-[9px] font-mono font-bold text-amber-400 block mt-0.5 whitespace-nowrap bg-amber-500/5 py-0.5 rounded border border-amber-500/10">
                      ▲ {stat.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real execution metadata visualizer to increase high tech vibe */}
            <div className="bg-sacramento-deep/30 p-2 rounded-lg border border-sacramento-light/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span>관제 연동 컴파일 정갑 완료됨</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-sacramento-bright">ENV: PRODUCTION // CLOUD READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function techList(techs: string[]) {
  return (
    <div className="flex flex-wrap gap-1 pt-3.5 border-t border-sacramento-light/10 mt-3.5">
      {techs.map(t => (
        <span key={t} className="text-[9px] font-mono text-slate-400 bg-sacramento-deep px-2 py-0.5 rounded border border-sacramento-light/10">
          #{t}
        </span>
      ))}
    </div>
  );
}
