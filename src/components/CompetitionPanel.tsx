import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  GitCommit, 
  Flame, 
  Zap, 
  TrendingUp, 
  Layers, 
  Terminal, 
  Target, 
  Sparkles,
  RefreshCw,
  GitPullRequest,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface AwardItem {
  id: string;
  title: string;
  host: string;
  prize: string;
  date: string;
  description: string;
}

interface CommitDay {
  date: string;
  count: number;
  message: string;
  category: 'feature' | 'fix' | 'refactor' | 'perf';
}

const AWARD_HISTORY: AwardItem[] = [
  {
    id: 'a1',
    title: '행정안전부 주관 공공/문화데이터 우수 활용 경진대회 및 국가 공모전',
    host: '행정안전부 & 한국지능정보사회진흥원',
    prize: '대상 (Grand Prize)',
    date: '2024.11',
    description: '공공 및 문화 원천 데이터 세트의 시맨틱 매핑 및 초고속 MVP 빌드 부문에서 정합성을 완벽히 충족하며 국가 대상 수상.'
  },
  {
    id: 'a2',
    title: '전국 대학생 지능 정보 기술 창업 AI 챌린지',
    host: '벤처기업협회',
    prize: '최우수상 (First Place)',
    date: '2024.08',
    description: '현업 상용 API 융합 및 슬랙 봇을 연동한 이탈률 실시간 방어 파이프라인 개발 부문에서 최우수 성과 증명.'
  },
  {
    id: 'a3',
    title: 'Enterprise AI Agent Hackathon',
    host: '메이저 클라우드 파트너 얼라이언스',
    prize: '금상 (Gold Prize)',
    date: '2024.05',
    description: '노션과 기성 이메일 허브를 연계한 100% 자동 정산 에이전트 설계 및 단 48시간 만의 PoC 기동 완료.'
  }
];

// Generates simulated consecutive commits for the 3D-skewed grid activity map
const COMMIT_LOGS: CommitDay[][] = [
  [
    { date: '월', count: 5, message: 'OAuth Authentication & Secure Callback Handler 이식', category: 'feature' },
    { date: '화', count: 2, message: 'Google Sheets API Sync Listener 버그 보강 패치', category: 'fix' },
    { date: '수', count: 8, message: '3D Parallax GPU Inertia Physics 가역 연산 가속화', category: 'perf' },
    { date: '목', count: 4, message: 'Firestore Real-time Rules & Security Audit 완결', category: 'feature' },
    { date: '금', count: 6, message: 'Express Vite Development Middleware 오케스트레이션', category: 'refactor' },
    { date: '토', count: 0, message: '메가 서버 백업 트래픽 모니터링 수립', category: 'fix' },
    { date: '일', count: 1, message: '프로덕션 가용 컨테이너 CLI 도커라이징 작업 완료', category: 'feature' }
  ],
  [
    { date: '월', count: 3, message: 'Gemini Multi-Modal API Structured JSON Schema 바인딩', category: 'feature' },
    { date: '화', count: 7, message: 'Tailwind CSS @import 컴포넌트 렌더링 최적화', category: 'perf' },
    { date: '수', count: 4, message: 'Naver Places API Dynamic Parser 이탈 보틀넥 개선', category: 'refactor' },
    { date: '목', count: 9, message: 'Client-side Micro Sparkline SVG 가속 생성 패키지 구축', category: 'feature' },
    { date: '금', count: 2, message: 'CORS 안전 프록시 통신 보안 검증 미들웨어 구축', category: 'fix' },
    { date: '토', count: 1, message: '실시간 가동 지표 수치 수렴 테스터 리팩토링', category: 'refactor' },
    { date: '일', count: 3, message: 'KION Labs AI 챌린지 성과지표 HUD 갱신', category: 'feature' }
  ],
  [
    { date: '월', count: 6, message: 'PoC 실증용 브랜드 웹사이트 고성능 UI 설계', category: 'feature' },
    { date: '화', count: 1, message: '메일 수신 트리거 스케줄링 큐 비활성 메모리 에러 해결', category: 'fix' },
    { date: '수', count: 5, message: '수작업 시간 84% 경감용 프롬프트 메타 템플릿 완성', category: 'feature' },
    { date: '목', count: 8, message: 'Github Actions CI/CD 파이프라인 Cloud Run 연동 검증', category: 'perf' },
    { date: '금', count: 4, message: '정밀 예측 분석 전용 Mini Diagnostic Crawler 마이그레이션', category: 'refactor' },
    { date: '토', count: 2, message: '검색 의도 분석용 시맨틱 마인 룩업 모듈 교정', category: 'fix' },
    { date: '일', count: 9, message: 'KION Labs 3D 기판 아레나 정합 연결 궤적 선 최적화', category: 'perf' }
  ],
  [
    { date: '월', count: 8, message: '24/7 추적형 실시간 백엔드 리스너 이벤트 구축', category: 'feature' },
    { date: '화', count: 6, message: '대용량 데이터 수집용 비동기 스케줄러 구조 리팩토링', category: 'refactor' },
    { date: '수', count: 3, message: '사용자 피드백 반응형 SVG 궤적 렌더링 무결 테스팅', category: 'fix' },
    { date: '목', count: 7, message: '임직원 활용 AI 플레이북 가이드 검토 배포', category: 'feature' },
    { date: '금', count: 11, message: 'KION Labs 맞춤형 성장 곡선 동적 그래프 컴포너트 작성', category: 'feature' },
    { date: '토', count: 4, message: '전환 신호 퍼널 마이닝 궤적 데이터 정렬 성능 고밀화', category: 'perf' },
    { date: '일', count: 2, message: '실시간 아레나 HUD 벤치마크 평가 프레임 보정보완', category: 'fix' }
  ]
];

export default function CompetitionPanel() {
  const [hoveredCommit, setHoveredCommit] = useState<CommitDay | null>(null);
  const [selectedAward, setSelectedAward] = useState<AwardItem>(AWARD_HISTORY[0]);
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Compute total commits across the log matrix
  useEffect(() => {
    let sum = 0;
    COMMIT_LOGS.forEach(week => {
      week.forEach(day => {
        sum += day.count;
      });
    });
    setTotalCommits(sum);
  }, []);

  const handleRefreshActivity = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-6 text-gray-300">
      
      {/* Top Banner Header with Award Badge Points */}
      <div className="relative border border-sacramento-light/40 bg-gradient-to-r from-sacramento-dark/95 to-sacramento-deep/95 p-6 rounded-xl shadow-lg md:flex md:items-center md:gap-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sacramento-bright/5 rounded-full blur-3xl pointer-events-none" />
        <div className="p-3 bg-sacramento-light/30 border border-sacramento-bright/35 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0 shadow-md shrink-0">
          <Trophy className="w-8 h-8 text-sacramento-bright" />
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-sacramento-light/40 border border-sacramento-bright/35 text-[10px] font-mono font-bold text-sacramento-bright tracking-wider mb-1 uppercase">
            <Flame className="w-3 text-amber-500 animate-pulse" /> HIGH IMPACT PERFORMANCE ASSURED
          </div>
          <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight font-sans">
            승리하는 프로젝트를 만드는 메커니즘
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-4xl">
            아이디어가 단순히 회의실에 머무르지 않고, 실제 시장과 실무 전장에서 강력한 경쟁 우위를 가지도록 만드는 법. KION Labs는 전국 단위 정부 공모전 대상 및 최우수상 릴레이 수상으로 검증된 초고속 MVP 빌드 역량과 가역적인 PoC 이식 능력으로 무결한 승률을 증명합니다.
          </p>
        </div>
      </div>

      {/* Top Stats: Award history cards and dynamic statistics overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Interactive Award list & core strategies (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright flex items-center gap-2">
              <Award className="w-4 h-4 text-sacramento-bright" /> 국가 기관 및 기업 공모전 연속 수상 이력
            </span>
            <span className="text-[9.5px] font-mono text-slate-500">클릭하여 세부 수상 전략 및 기여 확인</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {AWARD_HISTORY.map(award => {
              const isSelected = selectedAward.id === award.id;
              return (
                <button
                  key={award.id}
                  onClick={() => setSelectedAward(award)}
                  className={`relative p-3.5 rounded-xl border text-left transition duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-sacramento-dark/95 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                      : 'bg-sacramento-deep/30 border-sacramento-light/10 text-slate-400 hover:border-sacramento-light/30 hover:bg-sacramento-light/5'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8.5px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {award.prize}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">{award.date}</span>
                  </div>
                  <h4 className="text-xs font-black text-white font-sans line-clamp-1 mt-1 leading-snug">
                    {award.title.replace(' 및 국가 공모전', '')}
                  </h4>
                  <span className="text-[9.5px] font-mono text-slate-500 block truncate mt-1">주관: {award.host.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Selected Award Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAward.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-sacramento-deep/40 border border-sacramento-light/20 rounded-2xl p-5 h-[200px] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9.5px] font-mono text-amber-400 font-bold uppercase tracking-widest">// 수상 특설 기록 카드</span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedAward.date}</span>
                </div>
                
                <h4 className="text-sm md:text-base font-bold text-white font-sans leading-tight tracking-tight">
                  {selectedAward.title}
                </h4>
                
                <p className="text-[11.5px] text-slate-400 leading-normal font-sans font-medium">
                  {selectedAward.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-sacramento-light/10 pt-2.5 mt-2">
                <span>주관 기관: <strong>{selectedAward.host}</strong></span>
                <span className="text-sacramento-bright font-bold">KION Labs Fast-Build 최적 아키텍처 도입</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Core mechanism introduction (MVP Fast Build & PoC Complete) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-sacramento-deep/40 border border-sacramento-light/10 hover:border-sacramento-bright/40 transition duration-300 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-sacramento-bright">
                <Zap className="w-4 h-4 fill-current" />
                <h4 className="text-xs md:text-sm font-bold text-white font-sans tracking-tight">MVP Fast Build // 빠른 기획 및 발진</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                공모전 우승의 극적인 비결은 바로 '실행 속도'입니다. KION Labs는 아이디어를 장장 몇 달간 묵혀두는 소모적 논의 대신, 단 7~10일 만에 기상 동작이 가능한 1차 작동형 프로토타입 결과물을 빚어내어 시장 타당성과 정합성을 실증합니다.
              </p>
            </div>

            <div className="bg-sacramento-deep/40 border border-sacramento-light/10 hover:border-amber-400/30 transition duration-300 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-xs md:text-sm font-bold text-white font-sans tracking-tight">PoC(개념 증명) 완성 // 철두철미한 실체 증거</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                아이디어가 단순한 꿈이나 백서에 그치지 않도록, 실제 데이터 파이프라인 정합성과 API 반응 테스트를 통해 증명합니다. 불확실성 리스크를 0%에 수렴시키며 실제 사내 결재와 도입에 가장 명쾌한 재무적 수치 지표와 작동 증거를 건넵니다.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Awesome High-Performance Metrics & Battle Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright flex items-center gap-1.5">
              <Target className="w-4 h-4 text-sacramento-bright" /> KION Labs 누적 종합 성과 지표
            </span>
          </div>

          <div className="bg-sacramento-dark/90 border border-sacramento-light/25 rounded-2xl p-5 space-y-4 h-[426px] flex flex-col justify-between">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-sacramento-light/15 pb-2">
              🏆 BATTLE-TESTED AND MARKET PROVEN METRIC
            </div>

            {/* Micro value dashboard */}
            <div className="space-y-3.5 flex-1 flex flex-col justify-center">
              
              <div className="flex items-center justify-between bg-sacramento-deep/30 p-3.5 rounded-xl border border-sacramento-light/10">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">가상/공공 프로젝트 누적 승률</span>
                  <span className="text-xs text-slate-300 font-medium block leading-none">AI 아레나 검증 및 공모전 챌린지</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-sans">100% 승률</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 block">▲ 무실격 완주</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-sacramento-deep/30 p-3.5 rounded-xl border border-sacramento-light/10">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">MVP/PoC 제품 전환 타당성</span>
                  <span className="text-xs text-slate-300 font-medium block leading-none">작동형 실체 런칭 성공성 지표</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-sans">100% 달성</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 block">▲ 지연 없음</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-sacramento-deep/30 p-3.5 rounded-xl border border-sacramento-light/10">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">사내 업무 자동화 통합 부하율</span>
                  <span className="text-xs text-slate-300 font-medium block leading-none">가용 API 정합 트랙 테스트 통과</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-sacramento-bright font-sans">0.02% 미만</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 block">▲ 극도의 정밀성</span>
                </div>
              </div>

            </div>

            {/* Dynamic quote block to increase epic visual factor */}
            <div className="bg-amber-500/5 p-3 rounded-lg border border-amber-500/20 text-center text-xs font-sans text-slate-300 leading-normal">
              <strong>"가장 강력하고 빠른 런칭이 완벽한 정답이다."</strong>
              <p className="text-[9.5px] text-slate-500 mt-1 font-mono">
                이론의 상아탑에 머물지 않고, 매주 코드를 밀고 빌드하여 즉각 결과를 보여드리는 것이 저희 KION Labs의 엔지니어링 철학이자 압도적 성과 동결 제어 메커니즘입니다.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Segment: Interactive 3D Skew Github Commit Activity Graph */}
      <div className="relative border border-sacramento-light/20 bg-sacramento-dark/95 rounded-2xl p-6 overflow-hidden">
        
        {/* Glow point bg decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-sacramento-bright/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section title & "Never Stop" motto display */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-sacramento-light/15 pb-4 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-xs font-mono font-bold text-sacramento-bright uppercase tracking-widest">
                KION Labs Development Momentum // 실시간 빌드 가속화 모니터
              </span>
            </div>
            <h4 className="text-base md:text-lg font-black text-white font-sans tracking-tight">
              "우리는 멈추지 않고 계속 성장한다"
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              KION Labs의 매일 멈추지 않는 활성 리포지토리 코드 커밋 빈도와 주요 개발 여정 기록을 마이크로 3D 기판 그리드로 시각화했습니다. 
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono text-[10px] text-slate-400 shrink-0">
              <span className="text-slate-500 block">최근 4주 누적 통계</span>
              <span className="font-extrabold text-amber-400 text-xs">{totalCommits} COMMITS IN DEV BRANCH</span>
            </div>
            <button
              onClick={handleRefreshActivity}
              disabled={isRefreshing}
              className="p-2.5 bg-sacramento-deep/55 hover:bg-sacramento-light/10 border border-sacramento-light/20 text-slate-300 hover:text-white rounded-lg transition text-xs cursor-pointer"
              title="리포지토리 실시간 동기화"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Isometric 3D skewed graph block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Block: 3D Skew Activity Grid Map (8 cols) */}
          <div className="lg:col-span-8 overflow-x-auto pb-4 justify-center flex">
            {/* The 3D container using CSS transforms for gratifying depth effect */}
            <div 
              className="relative p-6 select-none bg-sacramento-deep/20 rounded-2xl border border-sacramento-light/10 transition-transform duration-500 hover:scale-[1.01] overflow-hidden"
              style={{
                perspective: '1000px'
              }}
            >
              {/* Subtle tech background grids */}
              <div className="absolute inset-0 bg-gradient-to-br from-sacramento-bright/5 via-transparent to-amber-500/5 pointer-events-none" />

              <div 
                className="flex gap-4 p-4 transform-gpu transition-all duration-300"
                style={{
                  transform: 'rotateX(20deg) rotateY(-10deg) rotateZ(2deg)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Y-Axis day names labels */}
                <div className="flex flex-col justify-between py-1.5 text-[9px] font-mono text-slate-500">
                  {['월', '화', '수', '목', '금', '토', '일'].map(d => (
                    <span key={d} className="h-5 flex items-center justify-end w-4 pr-1">{d}</span>
                  ))}
                </div>

                {/* 4 Weeks columns */}
                <div className="flex gap-3">
                  {COMMIT_LOGS.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-2.5">
                      {week.map((day, dayIdx) => {
                        // Intensity calculations: 0, 1-2, 3-5, 6-8, 9+ commits
                        const val = day.count;
                        let bgColor = 'bg-sacramento-deep/30 border-sacramento-light/10';
                        let shadowClass = '';

                        if (val > 0 && val <= 2) {
                          bgColor = 'bg-emerald-950/70 border-emerald-800/40';
                        } else if (val >= 3 && val <= 5) {
                          bgColor = 'bg-emerald-800/80 border-emerald-600/40 text-white';
                        } else if (val >= 6 && val <= 8) {
                          bgColor = 'bg-[#10b981]/90 border-emerald-400/40';
                          shadowClass = 'shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                        } else if (val >= 9) {
                          bgColor = 'bg-amber-400 border-amber-300';
                          shadowClass = 'shadow-[0_0_15px_rgba(245,158,11,0.55)] animate-pulse';
                        }

                        const isHovered = hoveredCommit?.date === day.date && hoveredCommit?.message === day.message;

                        return (
                          <div
                            key={dayIdx}
                            onMouseEnter={() => setHoveredCommit(day)}
                            onMouseLeave={() => setHoveredCommit(null)}
                            className={`w-6 h-6 rounded-md border-t cursor-pointer transition-all duration-200 transform hover:scale-125 hover:-translate-y-1 hover:rotate-12 ${bgColor} ${shadowClass} ${
                              isHovered ? 'ring-2 ring-white scale-110' : ''
                            } flex items-center justify-center`}
                            style={{
                              transformStyle: 'preserve-3d'
                            }}
                          >
                            {val > 6 && (
                              <GitCommit className="w-3.5 h-3.5 text-sacramento-dark" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Index hint legend */}
              <div className="mt-8 flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-sacramento-light/10 pt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>최근 4주간 주당 빌드 흐름량</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span>정체</span>
                  <span className="w-2.5 h-2.5 rounded bg-sacramento-deep/30 border border-sacramento-light/10" />
                  <span className="w-2.5 h-2.5 rounded bg-emerald-950/70 border border-emerald-800/40" />
                  <span className="w-2.5 h-2.5 rounded bg-emerald-800/80 border border-emerald-600/40" />
                  <span className="w-2.5 h-2.5 rounded bg-[#10b981] shadow" />
                  <span className="w-2.5 h-2.5 rounded bg-amber-400 shadow animate-pulse" />
                  <span>극강 (하루 9회+)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Commit Log Text details synced from hovered node (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-sacramento-deep border border-sacramento-light/15 rounded-xl p-4 min-h-[178px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Terminal className="w-16 h-16 text-sacramento-bright" />
              </div>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-sacramento-light/15 pb-2">
                📡 MOMENTUM INFOPAGE READOUT // STABLE
              </div>

              {hoveredCommit ? (
                <div className="space-y-2 py-2 animate-fade-in text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 rounded uppercase tracking-wider font-mono">
                      COMMIT RECORD
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-400">{hoveredCommit.date}요일 활동</span>
                  </div>
                  <p className="text-white font-black leading-snug font-sans">
                    {hoveredCommit.message}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] font-mono">
                    <span className="text-slate-500">분류: {hoveredCommit.category.toUpperCase()}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-sacramento-bright font-bold">총 {hoveredCommit.count}개의 변경 단위 커밋됨</span>
                  </div>
                </div>
              ) : (
                <div className="my-auto text-left space-y-1.5 py-4">
                  <span className="text-[10px] font-mono text-sacramento-bright block font-bold uppercase tracking-wider">// 코드 리포지토리 현황</span>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans font-medium">
                    그리드의 네모 타일들에 마우스를 올려보세요. KION Labs가 실무 가용 수준까지 끌어올리기 위해 배포했던 실제 핵심 설계 모듈의 개발 로그가 노출됩니다.
                  </p>
                </div>
              )}

              {/* Status footer inside HUD */}
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-600 pt-2 border-t border-sacramento-light/10 mt-2">
                <span>API CHANNEL: GITHUB CLIENT SYNCD</span>
                <span>STATE: OPTIMIZED</span>
              </div>
            </div>
            
            <div className="bg-sacramento-deep/40 rounded-xl p-3 border border-sacramento-light/10 flex items-center justify-between text-[11px] font-sans">
              <span className="text-slate-400 font-medium">실시간 원격 코드 저장소</span>
              <a 
                href="#consult"
                onClick={(e) => {
                  e.preventDefault();
                  // Dispatch custom event to trigger dialog or navigation if possible
                  const el = document.getElementById('education-tab-btn') || document.querySelector('[data-tab="education"]');
                  if (el) {
                    (el as HTMLElement).click();
                    setTimeout(() => {
                      const cBtn = document.querySelector('button[class*="from-amber-500"]');
                      if (cBtn) (cBtn as HTMLElement).click();
                    }, 100);
                  }
                }}
                className="text-amber-400 font-extrabold hover:text-white transition flex items-center gap-0.5 cursor-pointer"
              >
                진단 신청하고 개발 시작하기 <GitPullRequest className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
