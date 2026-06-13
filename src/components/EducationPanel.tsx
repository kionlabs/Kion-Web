import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Zap, 
  Send, 
  Clock, 
  Award,
  ChevronRight,
  ArrowUpRight,
  Target
} from 'lucide-react';

interface CurriculumItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverable: string;
  bullets: string[];
}

const CURRICULUM_DATA: CurriculumItem[] = [
  {
    id: 'prompt',
    title: '프롬프트 엔지니어링: AI와 소통하는 비즈니스 언어 설계',
    subtitle: '조직 전반의 지능 대리인 조율 표준 마련',
    description: '단순한 대화를 넘어 논리적 생각의 사슬(CoT), 퓨샷 지번 기법, 데이터 시맨틱 룩업을 직접 제어하여 기획서 작성 및 이메일 구상을 자동화하는 최적의 프롬프팅 프로토콜을 규격화합니다.',
    duration: '2주 집중 트랙',
    deliverable: '우리 회사 전용 프롬프트 플레이북 & 역할 가이드라인',
    bullets: [
      '생각의 소리(Chain of Thought)를 통한 추론 오차 차단',
      '역전환 질문 및 다차원 메타 프롬프트를 통한 산출 정합성 극대화',
      '오케스트레이션 및 프롬프트 주사율 컨트롤 기법 마스터'
    ]
  },
  {
    id: 'automation',
    title: '자동화 워크숍: 반복 업무를 제로(0)로 만드는 AI 파이프라인 구축',
    subtitle: '업무 지연을 완전 퇴출하는 노코드/로우코드 파인 엔진',
    description: '이메일, 스프레드시트, 사내 슬랙, 노션 등 기성 데이터 플랫폼과 인공지능 에이전트 허브를 하나로 융합하고, 휴먼 인터페이스 개입 없이 백엔드에서 업무가 완전 자동 작동하는 가역 파이프라인을 밀착 제작합니다.',
    duration: '3주 실전 워크숍',
    deliverable: '바로 투입 가능한 현업 실무 자동화 앱 및 구동 시스템',
    bullets: [
      'API 자동 바인딩 및 부하 없는 스케줄링 트리거 설정',
      '데이터베이스 실시간 반응형 내부 도구 웹 빌드',
      '반복 복사·유포 및 정산 업무를 100% 자율 노출 자동화 레이어로 구축'
    ]
  },
  {
    id: 'project',
    title: 'AI 리터러시 프로젝트: 우리 조직만의 데이터 활용 전략',
    subtitle: '팀 전체의 AI 가독 능력 및 실증 성과 연계',
    description: '도입한 AI 기술이 공회전하지 않도록 사내 데이터 인프라의 마케팅 경쟁 분석, 고객 가치 탐색, 전환 신호 예측 모델링과 결착시켜 즉각적인 재무적 상위 지표 개선을 완결합니다.',
    duration: '4주 프로젝트 연계',
    deliverable: '전환 신호 분석 기반 실무 경영 효율 보고서 및 솔루션',
    bullets: [
      '블로그 및 플레이스 경쟁 상황의 다중 데이터 자동 추출 설계',
      '고객 전환 흔적 신호의 퍼널 마이닝과 AI 분류 정밀화',
      '수치화된 영업 이익 목표에 부합하는 사내 AI 거버넌스 전술 확립'
    ]
  }
];

export default function EducationPanel() {
  const [activeTab, setActiveTab] = useState<string>('prompt');
  const [showConsultForm, setShowConsultForm] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Custom form inputs
  const [orgName, setOrgName] = useState<string>('');
  const [interest, setInterest] = useState<string>('prompt');
  const [bottleneck, setBottleneck] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !contactPhone) {
      alert('신청 필수 항목(회사명, 담당자명, 연락처)을 빠짐없이 입력해 주세요.');
      return;
    }
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setOrgName('');
    setInterest('prompt');
    setBottleneck('');
    setContactName('');
    setContactPhone('');
    setIsSubmitted(false);
    setShowConsultForm(false);
  };

  const selectedClass = CURRICULUM_DATA.find(c => c.id === activeTab) || CURRICULUM_DATA[0];

  return (
    <div className="space-y-6 text-gray-300">
      {/* Top Header Panel - Gold and Emerald point premium aesthetics */}
      <div className="relative border border-amber-500/30 bg-gradient-to-r from-sacramento-dark/90 to-sacramento-deep/90 p-6 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.06)] md:flex md:items-center md:gap-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="p-3 bg-amber-500/15 border border-amber-500/25 rounded-lg text-amber-400 inline-block mb-3 md:mb-0 shadow-[0_0_15px_rgba(245,158,11,0.15)] shrink-0">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-200 tracking-wider mb-1 upper font-mono uppercase">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" /> PRO LEVEL ACADEMY FOR ENTERPRISE
          </div>
          <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight font-sans">
            단순 학습을 넘어, 실무의 언어를 코딩하다
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-3xl">
            KION Labs는 단순 교재 전달식 설명에서 완전히 벗어났습니다. 사내 인공지능 공화 언어를 설계하고, 무가치하고 늘어지는 수작업 업무를 완전 자동 파이프라인으로 전환하는 밀착 트레이닝을 지원합니다.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Curriculum details & Right Growth Curve graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: High Impact interactive Curriculum Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright">
              KION LABS CORE CURRICULUM // 핵심 교육 과정
            </span>
            <Target className="w-4 h-4 text-sacramento-bright" />
          </div>

          <div className="grid grid-cols-3 gap-1.5 bg-sacramento-deep/30 p-1 rounded-lg border border-sacramento-light/10">
            {CURRICULUM_DATA.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-2 px-1 text-center rounded-md text-[10.5px] font-sans font-bold transition-all cursor-pointer truncate ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-sacramento-dark shadow-md shadow-amber-500/10'
                    : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-sacramento-light/10'
                }`}
              >
                {item.id === 'prompt' ? '1. 프롬프트' : item.id === 'automation' ? '2. 자동화' : '3. 리터러시'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-sacramento-deep/40 border border-sacramento-light/20 rounded-xl p-5 space-y-4 relative overflow-hidden h-[330px] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">
                  {selectedClass.duration} · 최종 성과물: {selectedClass.deliverable}
                </span>
                
                <h4 className="text-base font-bold text-white leading-normal font-sans tracking-tight">
                  {selectedClass.title}
                </h4>
                
                <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans font-medium">
                  {selectedClass.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">특설 수련 영역</span>
                  {selectedClass.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-sacramento-dark/60 p-2.5 rounded border border-sacramento-light/10 flex items-center justify-between text-[10.5px] font-sans">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5 text-sacramento-bright" />
                  <span>실습 밀착 서포트 제공</span>
                </div>
                <button 
                  onClick={() => {
                    setInterest(selectedClass.id);
                    setShowConsultForm(true);
                  }}
                  className="text-amber-400 font-extrabold hover:text-white transition flex items-center gap-0.5 cursor-pointer"
                >
                  과정 상담신청 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Gorgeous Animated SVG Growth Curve Graph */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright">
              Competence Growth Curves // 실질 역량 성장 곡선
            </span>
            <TrendingUp className="w-4 h-4 text-sacramento-bright animate-bounce" />
          </div>

          <div className="bg-sacramento-dark/80 border border-sacramento-light/25 rounded-xl p-4 space-y-4 h-[382px] flex flex-col justify-between">
            <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-sacramento-light/15 pb-2">
              <span>조직 내 AI 성과 도출율 비교 시뮬레이션</span>
              <span className="font-bold text-amber-400">KION Labs 밀착 케어 트랙</span>
            </div>

            {/* Dynamic Graph Container */}
            <div className="relative w-full h-48 bg-sacramento-deep/30 rounded border border-sacramento-light/10 p-2 overflow-hidden flex items-end">
              {/* Backgrid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-10">
                <div className="w-full border-t border-white" />
                <div className="w-full border-t border-white" />
                <div className="w-full border-t border-white" />
                <div className="w-full border-t border-white" />
              </div>

              {/* Competency Level Badge Y-Axis Label */}
              <div className="absolute left-2 top-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                AI 역량 / 업무 자동화 변량율 (%)
              </div>

              {/* The SVG and Curves */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150">
                <defs>
                  {/* Gradient for KION Labs growth curve */}
                  <linearGradient id="gradientKion" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(245,158,11,0.02)" />
                    <stop offset="60%" stopColor="rgba(245,158,11,0.15)" />
                    <stop offset="100%" stopColor="rgba(245,158,11,0.3)" />
                  </linearGradient>

                  {/* Gradient for standard self-study */}
                  <linearGradient id="gradientSelf" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(100,116,139,0.01)" />
                    <stop offset="100%" stopColor="rgba(100,116,139,0.05)" />
                  </linearGradient>
                </defs>

                {/* X and Y baseline axises */}
                <line x1="20" y1="130" x2="290" y2="130" stroke="rgba(22, 91, 68, 0.3)" strokeWidth="1" />
                
                {/* Traditional Self Study Path Curve (linear/stagnating) */}
                <path
                  d="M 20,120 Q 80,115 150,105 T 290,95"
                  fill="none"
                  stroke="rgba(100,116,139,0.5)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                
                {/* KION Labs Path Curve (Exponential Adaptation) */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  d="M 20,120 Q 90,110 160,55 T 290,15"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                />

                {/* Fill area beneath KION curve */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  d="M 20,120 Q 90,110 160,55 T 290,15 L 290,130 L 20,130 Z"
                  fill="url(#gradientKion)"
                />

                {/* Nodes on KION Path */}
                <circle cx="20" cy="120" r="3" fill="#f59e0b" />
                <circle cx="100" cy="103" r="3.5" fill="#f59e0b" />
                <circle cx="180" cy="46" r="4" fill="#f59e0b" className="animate-ping" />
                <circle cx="290" cy="15" r="5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" />
                
                {/* Dynamic floating text markup */}
                <text x="10" y="142" fill="rgba(148,163,184,0.7)" fontSize="8" fontFamily="sans-serif">도입전</text>
                <text x="90" y="142" fill="rgba(148,163,184,0.7)" fontSize="8" fontFamily="sans-serif">1주차(프롬프트)</text>
                <text x="175" y="142" fill="rgba(148,163,184,0.7)" fontSize="8" fontFamily="sans-serif">2-3주차(자동화)</text>
                <text x="252" y="142" fill="#f59e0b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">수료(전환 극대화)</text>
                
                {/* Legend indicator text in graph space */}
                <text x="190" y="80" fill="rgba(148,163,184,0.6)" fontSize="7" fontFamily="sans-serif">일반 독학 트랙 (32% 머무름)</text>
                <text x="105" y="32" fill="#f59e0b" fontSize="9" fontFamily="sans-serif" fontWeight="black" className="animate-pulse">
                  KION 성과 보장형 트랙 (92% 완성) ▲
                </text>
              </svg>
            </div>

            {/* Quick value details beneath graph */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[10.5px] font-sans">
              <div className="bg-sacramento-deep/30 p-2 rounded border border-sacramento-light/10 text-center">
                <span className="text-slate-500 block text-[9.5px]">자체 교육 조직 정합성</span>
                <span className="text-slate-400 font-bold block mt-0.5">답보 상태 (현업 활용 극소)</span>
              </div>
              <div className="bg-amber-500/5 p-2 rounded border border-amber-500/20 text-center">
                <span className="text-amber-200 block text-[9.5px]">KION Labs 실증 성장성</span>
                <span className="text-amber-400 font-extrabold block mt-0.5">실제 임직원 리터러시 92% 달성</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats Indicators Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-sacramento-deep/50 border border-sacramento-light/20 rounded-lg p-3 text-center space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">조직 전체 습득력</span>
          <span className="text-lg font-black text-white block">학습 효율 92% 향상</span>
        </div>
        <div className="bg-sacramento-deep/50 border border-sacramento-light/20 rounded-lg p-3 text-center space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">업무 파이프라인 개발</span>
          <span className="text-lg font-black text-amber-400 block">적용 속도 3배 개선</span>
        </div>
        <div className="bg-sacramento-deep/50 border border-sacramento-light/20 rounded-lg p-3 text-center space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">워크숍 수강 누적</span>
          <span className="text-lg font-black text-white block">총 35회 세미나 돌파</span>
        </div>
        <div className="bg-sacramento-deep/50 border border-sacramento-light/20 rounded-lg p-3 text-center space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">기업 교육 만족 평치</span>
          <span className="text-lg font-black text-sacramento-bright block">참여자 만족도 98.2%</span>
        </div>
      </div>

      {/* Prominent Golden Pulse CTA Button at the bottom */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowConsultForm(true)}
          className="relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-sacramento-dark font-sans font-black px-8 py-4 rounded-xl text-sm hover:brightness-110 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.25)] transition duration-300 cursor-pointer uppercase tracking-wider select-none border-t border-white/20"
        >
          <Zap className="w-4.5 h-4.5 fill-current animate-pulse text-sacramento-deep" />
          <span>⚡ KION Labs 맞춤형 AI 도입 무료 진단 상담하기</span>
          <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
          
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-200"></span>
          </span>
        </button>
        <p className="text-[10.5px] font-sans text-slate-500 mt-2">
          부담 없이 신청하세요. 조직 내부의 자동화 보틀넥에 부합하는 즉각적인 가이드 개조 시안을 무료로 제공해드립니다.
        </p>
      </div>

      {/* Overlay modal for Lead consultation */}
      <AnimatePresence>
        {showConsultForm && (
          <div className="fixed inset-0 bg-sacramento-dark/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-sacramento-deep border border-amber-500/30 w-full max-w-lg p-6 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.12)] space-y-4"
            >
              {!isSubmitted ? (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-display font-black text-white flex items-center gap-1.5">
                        <Award className="w-5 h-5 text-amber-400" /> KION Labs 맞춤형 진단 무료 컨설팅 신청
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1">
                        어떤 과정이 귀사 전력에 극적인 돌파구를 가져오는지, 기업 밀착형 전문 고도 진단을 실행합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConsultForm(false)}
                      className="text-slate-500 hover:text-white transition font-bold text-base cursor-pointer px-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3.5 pt-2 text-xs">
                    {/* Organization Selector */}
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-400 font-bold block">회사 또는 단체명 <span className="text-amber-400">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="예: 키온 테크놀로지"
                        value={orgName}
                        onChange={e => setOrgName(e.target.value)}
                        className="w-full bg-sacramento-dark/80 border border-sacramento-light/40 rounded p-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Interest Category Selector */}
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-400 font-bold block">진단을 원하시는 주요 관심 코스</label>
                      <select
                        value={interest}
                        onChange={e => setInterest(e.target.value)}
                        className="w-full bg-sacramento-dark/80 border border-sacramento-light/40 rounded p-2.5 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="prompt">1. 프롬프트 엔지니어링: AI와 소통하는 비즈니스 언어 설계</option>
                        <option value="automation">2. 자동화 워크숍: 반복 업무를 제로로 만드는 자동 파이프라인 구축</option>
                        <option value="project">3. AI 리터러시 프로젝트: 우리 조직만의 데이터 활용 전략</option>
                      </select>
                    </div>

                    {/* Bottleneck Input box */}
                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-400 font-bold block">현재 소속 조직의 가장 비효율적인 수작업/병목 업무</label>
                      <textarea
                        placeholder="예: 고객 문의 메일을 분류하고 엑셀 시트에 복사 붙여넣기 하여 정리하는 수작업이 하루 3시간 이상 소요됩니다."
                        value={bottleneck}
                        onChange={e => setBottleneck(e.target.value)}
                        className="w-full bg-sacramento-dark/80 border border-sacramento-light/40 rounded p-2.5 text-white h-20 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>

                    {/* Contact details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10.5px] text-slate-400 font-bold block">담당자 성함 <span className="text-amber-400">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="예: 김키온 팀장"
                          value={contactName}
                          onChange={e => setContactName(e.target.value)}
                          className="w-full bg-sacramento-dark/80 border border-sacramento-light/40 rounded p-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10.5px] text-slate-400 font-bold block">연락처/이메일 <span className="text-amber-400">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="예: kion@kionlabs.com 또는 010-XXXX-XXXX"
                          value={contactPhone}
                          onChange={e => setContactPhone(e.target.value)}
                          className="w-full bg-sacramento-dark/80 border border-sacramento-light/40 rounded p-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowConsultForm(false)}
                      className="bg-transparent border border-slate-700 text-slate-400 hover:text-white px-4 py-2 rounded text-xs transition cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-400 text-sacramento-dark font-bold px-5 py-2.5 rounded text-xs hover:brightness-110 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 fill-current" />
                      신청 완료 및 정밀 진단 받기
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex items-center justify-center p-3.5 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-display font-black text-white">진단 무료 컨설팅 접수 완료!</h3>
                    <p className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                      <strong>{orgName} ({contactName} 님)</strong>의 맞춤형 검토 신청이 정상 수치화되었습니다. 입력하신 병목점 데이터를 기반으로 KION Labs 최적 맞춤 보고서를 준비하여 신속 연락드리겠습니다.
                    </p>
                  </div>
                  <div className="bg-sacramento-dark/50 p-4 rounded-xl border border-sacramento-light/20 space-y-2 text-left text-xs">
                    <div className="text-sacramento-bright font-bold uppercase tracking-wider text-[9px] font-mono">
                      // KION Labs AI 가상 분석 리포트
                    </div>
                    <div className="text-slate-300 leading-relaxed font-sans">
                      <span className="text-amber-400 font-semibold">[보완 추천 사항]</span> 귀사에서 언급한 수작업 병목점은 저희 <strong>{interest === 'prompt' ? '프롬프트 엔지니어링 실증 설계' : interest === 'automation' ? '워크숍 반복 업무 무결 필터 엔진' : '전환 지표 탐색 AI 리터러시 프로젝트'}</strong> 세션을 통해 업무 소요 시간을 <strong>최대 82% 이상 감축</strong>할 수 있는 비즈니스 케이스입니다. 정식 상담 연락을 기대해 주시기 바랍니다.
                    </div>
                  </div>
                  <button
                    onClick={handleResetForm}
                    className="w-full bg-sacramento-light/40 hover:bg-sacramento-light border border-sacramento-light font-bold py-2.5 rounded text-xs text-white transition cursor-pointer"
                  >
                    돌아가기
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
