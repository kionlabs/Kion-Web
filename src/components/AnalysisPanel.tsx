import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Search, 
  Globe, 
  LineChart, 
  ArrowUpRight, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Sparkles,
  RefreshCw,
  Database,
  HelpCircle
} from 'lucide-react';

interface MetricTracker {
  name: string;
  key: string;
  current: number;
  history: number[];
  unit: string;
  color: string;
}

export default function AnalysisPanel() {
  // Real-time drifting stats
  const [trackers, setTrackers] = useState<MetricTracker[]>([
    {
      name: '블로그 가시성 지수 (Blog Visibility)',
      key: 'blog',
      current: 82.4,
      history: [71, 74, 73, 76, 75, 79, 81, 80, 82, 84, 82, 83],
      unit: '%',
      color: '#10b981'
    },
    {
      name: '플레이스 전환 가동률 (Place Proximity CTR)',
      key: 'place',
      current: 4.85,
      history: [3.1, 3.4, 3.2, 3.8, 4.0, 4.1, 4.3, 4.5, 4.7, 4.6, 4.8, 4.9],
      unit: '%',
      color: '#f59e0b'
    },
    {
      name: '인텐트 인쇄 신호 전환율 (Strategy Alignment)',
      key: 'conversion',
      current: 92.1,
      history: [81, 84, 83, 86, 88, 89, 87, 91, 93, 90, 92, 92],
      unit: '%',
      color: '#06b6d4'
    }
  ]);

  // Demo States
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [diagnosticType, setDiagnosticType] = useState<string>('blog_intel');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosisStep, setDiagnosisStep] = useState<string>('');
  const [reportResult, setReportResult] = useState<any | null>(null);

  // Periodically drift sparklines to give that satisfying "24/7 living system" feel
  useEffect(() => {
    const driftInterval = setInterval(() => {
      setTrackers(prev => prev.map(tracker => {
        let delta = 0;
        let nextHistory = [...tracker.history];
        
        if (tracker.key === 'blog') {
          delta = (Math.random() * 1.6 - 0.8);
          const nextVal = Math.max(10, Math.min(100, tracker.current + delta));
          nextHistory.shift();
          nextHistory.push(Math.round(nextVal));
          return { ...tracker, current: parseFloat(nextVal.toFixed(1)), history: nextHistory };
        } else if (tracker.key === 'place') {
          delta = (Math.random() * 0.16 - 0.08);
          const nextVal = Math.max(1, Math.min(10, tracker.current + delta));
          nextHistory.shift();
          nextHistory.push(nextVal);
          return { ...tracker, current: parseFloat(nextVal.toFixed(2)), history: nextHistory };
        } else {
          delta = (Math.random() * 1.2 - 0.6);
          const nextVal = Math.max(10, Math.min(100, tracker.current + delta));
          nextHistory.shift();
          nextHistory.push(Math.round(nextVal));
          return { ...tracker, current: parseFloat(nextVal.toFixed(1)), history: nextHistory };
        }
      }));
    }, 3500);

    return () => clearInterval(driftInterval);
  }, []);

  const handleRunDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) {
      alert('진단할 URL 또는 회사 도메인 주소를 입력해 주세요.');
      return;
    }

    setIsDiagnosing(true);
    setReportResult(null);

    const steps = [
      '데이터 허브 구축 상태 확인 중...',
      '블로그 및 지도 플레이스 경쟁 현황 덤핑 중...',
      '검색 키워드 노출 빈도 퍼널 정렬 중...',
      '핵심 타겟 고객 전환 이탈 신호 포이즌 분석 중...',
      'KION 최적화 비즈니스 시나리오 가상 피팅 중...'
    ];

    let currentStepIdx = 0;
    setDiagnosisStep(steps[0]);

    const stepInterval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        setDiagnosisStep(steps[currentStepIdx]);
      } else {
        clearInterval(stepInterval);
        
        // Finalize simulation results based on url input
        setTimeout(() => {
          generateSimulationReport();
          setIsDiagnosing(false);
        }, 600);
      }
    }, 700);
  };

  const generateSimulationReport = () => {
    // Determine random/realistic parameters based on URL input keywords
    const urlLower = targetUrl.toLowerCase();
    const isNaverBlog = urlLower.includes('blog.naver') || urlLower.includes('blog.');
    const isNaverMap = urlLower.includes('map') || urlLower.includes('place') || urlLower.includes('store');

    let categoryLabel = '종합 예측 인텔리전스';
    let visibilityScore = 64;
    let rankPercentile = '상위 34%';
    let coreBottleneck = '의도 정합성이 낮은 단순 키워드 도배성 글이 위주로, 전환 이탈율이 매우 높음';
    let actionManual = '전환 신호 분석 트랙 도입을 통해 정보 중심 문맥을 강화하고 독자를 플레이스/카카오톡 문의로 유입시키는 CTA 퍼널 재배치가 필요합니다.';
    
    if (diagnosticType === 'blog_intel' || isNaverBlog) {
      categoryLabel = '블로그/플레이스 인텔리전스 분석';
      visibilityScore = isNaverBlog ? 72 : 48;
      rankPercentile = isNaverBlog ? '상위 22%' : '상위 45%';
      coreBottleneck = '상위 키워드 점유는 이루어지고 있으나 실제 핵심 구매 의도(Commercial Intent) 검색어 점포 가중치가 누락됨';
      actionManual = 'KION Labs 프롬프트 엔지니어링 표준 프레임워크를 수렴하여 일반 조회수 지표가 아닌 실제 구매 예약 전환율이 높은 타겟 검색어 지형을 공략해야 합니다.';
    } else if (diagnosticType === 'place_visibility' || isNaverMap) {
      categoryLabel = '플레이스 노출 & 전환 정밀 진단';
      visibilityScore = isNaverMap ? 79 : 52;
      rankPercentile = isNaverMap ? '상위 15%' : '상위 38%';
      coreBottleneck = '지도 리뷰 유입 세션은 준수하나 플레이스 내부 콘텐츠 체류 시간 및 전화/길찾기 클릭으로 이어지는 결정적 소구 매력 결여';
      actionManual = '지역 타겟 근접 매칭 키워드 최적화 및 사내 마케터가 바로 운용 가능한 블로그와 지도 연계형 자동 순환 파이프라인 워크숍 수상을 강력 제안합니다.';
    } else {
      categoryLabel = '검색 의도 포지션 & 실시간 퍼널 진단';
      visibilityScore = 58;
      rankPercentile = '상위 29%';
      coreBottleneck = '잠재 고객이 고민하는 병목을 해소시켜 주는 지보 콘텐츠가 부족하여, 방문 후 즉각 이탈하며 경쟁사로 유입되는 추세';
      actionManual = '기존 마케팅 소재들의 시너지 효과를 내기 위한 랜딩 페이지 전환 가독 설계 개입과 주당 업무 소요 시간을 단축시키는 AI 데이터 추출 자동화 시스템 구축을 권장합니다.';
    }

    setReportResult({
      url: targetUrl,
      category: categoryLabel,
      score: visibilityScore,
      percentile: rankPercentile,
      bottleneck: coreBottleneck,
      advisor: actionManual,
      stats: {
        keywordClarity: Math.round(visibilityScore * 1.1 + 8),
        competitorGap: isNaverBlog ? '우수 (A)' : '보완 요망 (C-)',
        monthlySavingHours: Math.round(18 + Math.random() * 12) + '시간'
      }
    });
  };

  return (
    <div className="space-y-6 text-gray-300">
      {/* Top Professional Header */}
      <div className="relative border border-sacramento-light/40 bg-gradient-to-r from-sacramento-dark/95 to-sacramento-deep/95 p-6 rounded-xl shadow-lg md:flex md:items-center md:gap-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sacramento-bright/5 rounded-full blur-3xl pointer-events-none" />
        <div className="p-3 bg-sacramento-light/30 border border-sacramento-bright/35 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0 shadow-md shrink-0">
          <BarChart3 className="w-8 h-8 text-sacramento-bright" />
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-sacramento-light/40 border border-sacramento-bright/35 text-[10px] font-mono font-bold text-sacramento-bright tracking-wider mb-1 uppercase">
            <Database className="w-3" /> INTENT DRIVEN EMPIRICAL DATA FORECAST
          </div>
          <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight font-sans">
            감(感)이 아닌 데이터로 결정하는 전략
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-4xl">
            감사나 주먹구구식 마케팅은 무익하게 자본을 소비시킵니다. KION Labs의 전문 원격 진단 플랫폼은 정밀한 시맨틱 경쟁 분석, 실시간 전환 신호 트랙, 이탈 병목 진단을 통해 재무 성과로 곧장 직결되는 고정밀 전술적 방향을 수치로 투명하게 입증합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Mini-Demo Interactive Diagnostic Crawler Tool (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright flex items-center gap-2">
              <Search className="w-4 h-4 text-sacramento-bright animate-pulse" /> KION Labs 데이터 정부 무료 신속 진단소
            </span>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              MINI LIVE SANDBOX DEMO
            </span>
          </div>

          <div className="bg-sacramento-dark/95 border border-sacramento-light/25 rounded-2xl p-5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sacramento-bright/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-1">
              <h4 className="text-xs md:text-sm font-bold text-white font-sans flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-sacramento-bright" /> 실제 도입을 위한 사전 상태 간이 검사
              </h4>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                현재 운영 중인 브랜드 블로그 주소, 스마트플레이스 링크, 혹은 핵심 회사 웹사이트 URL을 입력하시면 KION의 지능 프레임워크가 가용 잠재력과 이탈 취약점을 실시간 모의 탐색하여 결과를 출력합니다.
              </p>
            </div>

            <form onSubmit={handleRunDiagnosis} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Select diagnostic objective */}
                <div className="sm:col-span-1">
                  <select
                    value={diagnosticType}
                    onChange={(e) => setDiagnosticType(e.target.value)}
                    disabled={isDiagnosing}
                    className="w-full bg-sacramento-deep border border-sacramento-light/40 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-sacramento-bright cursor-pointer"
                  >
                    <option value="blog_intel">블로그 검색 인텔리전스</option>
                    <option value="place_visibility">플레이스 가시성 & CTR</option>
                    <option value="funnel_conversion">검색의도 & 인텐트 퍼널</option>
                  </select>
                </div>

                {/* Main URL Text field */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    disabled={isDiagnosing}
                    placeholder="예: blog.naver.com/kionlabs 또는 홈페이지 주소"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full bg-sacramento-deep border border-sacramento-light/40 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-sacramento-bright"
                  />
                </div>
              </div>

              {/* Crawling button trigger */}
              <button
                type="submit"
                disabled={isDiagnosing || !targetUrl}
                className="w-full bg-sacramento-bright text-sacramento-dark font-sans font-black py-2.5 rounded-lg text-xs hover:brightness-110 active:scale-[0.98] transition shadow-[0_0_15px_rgba(16,185,129,0.12)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isDiagnosing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{diagnosisStep}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>실시간 퍼널 정합도 및 AI 데이터 진단 리포트 뽑아내기</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated Live Response Terminal Block */}
            <div className="min-h-[174px] bg-sacramento-deep/30 rounded-xl border border-sacramento-light/10 p-4 relative flex flex-col justify-between">
              
              {!isDiagnosing && !reportResult && (
                <div className="my-auto text-center space-y-2 py-4">
                  <div className="inline-flex p-2.5 bg-sacramento-light/10 border border-sacramento-light/30 rounded-full text-slate-500">
                    <HelpCircle className="w-6 h-6 text-sacramento-bright" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-sans max-w-xs mx-auto">
                    URL을 입력하고 진단 가동 버튼을 클릭하시면, KION 가용 지능 탐색 리포트 모의 출력이 이 기판 블록에 생성됩니다.
                  </p>
                </div>
              )}

              {isDiagnosing && (
                <div className="my-auto text-center space-y-3 py-6">
                  <div className="inline-block relative">
                    <RefreshCw className="w-8 h-8 text-sacramento-bright animate-spin text-center mx-auto" />
                    <span className="absolute inset-0 bg-transparent rounded-full animate-ping border border-sacramento-bright/40" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-sacramento-bright animate-pulse">{diagnosisStep}</p>
                    <p className="text-[9.5px] font-mono text-slate-500">KION CRAWLER v3.12 · CRAWLING DEPTH MATCHING</p>
                  </div>
                </div>
              )}

              {reportResult && !isDiagnosing && (
                <div className="space-y-3 animate-fade-in text-[10.5px] font-sans">
                  <div className="flex justify-between items-center border-b border-sacramento-light/15 pb-2">
                    <span className="text-[9px] font-mono font-bold text-sacramento-bright bg-sacramento-light/25 px-2 py-0.5 rounded">
                      진단 정합 장소: {reportResult.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold font-mono">{reportResult.url}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-sacramento-dark/60 p-2 rounded border border-sacramento-light/10 text-center">
                      <span className="text-slate-500 text-[9px] block">퍼널 전환 잠재치</span>
                      <span className="text-white font-extrabold text-sm block mt-0.5">{reportResult.score} / 100</span>
                      <span className="text-[8px] text-amber-400 font-bold font-mono">{reportResult.percentile}</span>
                    </div>

                    <div className="bg-sacramento-dark/60 p-2 rounded border border-sacramento-light/10 text-center">
                      <span className="text-slate-500 text-[9px] block">키워드 선점 명확도</span>
                      <span className="text-[#10b981] font-extrabold text-sm block mt-0.5">{reportResult.stats.keywordClarity}%</span>
                      <span className="text-[8px] text-slate-500 font-bold">임팩트 정합</span>
                    </div>

                    <div className="bg-sacramento-dark/60 p-2 rounded border border-sacramento-light/10 text-center">
                      <span className="text-slate-500 text-[9px] block">경쟁 우위 지형 격차</span>
                      <span className="text-[#10b981] font-extrabold text-sm block mt-0.5">{reportResult.stats.competitorGap}</span>
                      <span className="text-[8px] text-amber-400 font-bold">도입후 {reportResult.stats.monthlySavingHours} 절감</span>
                    </div>
                  </div>

                  <div className="bg-amber-500/5 p-2.5 rounded border border-amber-500/20 space-y-1">
                    <div className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Core Funnel Bottleneck // 핵심 이탈 병목 점포
                    </div>
                    <p className="text-[10.5px] text-slate-300 leading-normal font-sans">
                      {reportResult.bottleneck}
                    </p>
                  </div>

                  <div className="bg-sacramento-light/5 p-2 rounded border border-sacramento-light/10 text-[10.5px] text-slate-300 leading-relaxed font-sans mt-1">
                    <strong className="text-sacramento-bright font-medium">💡 KION 전략적 가이딩:</strong> {reportResult.advisor}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Real-time Sparklines (Vertical Stack) (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-sacramento-light/20">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sacramento-bright flex items-center gap-1.5">
              <LineChart className="w-4 h-4 text-sacramento-bright" /> 실시간 인사이트 스파크라인 리포트
            </span>
          </div>

          <div className="bg-sacramento-dark/90 border border-sacramento-light/25 rounded-2xl p-4 space-y-4 h-[448px] flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">// 24/7 ACTIVE SEMANTIC CAPTURE PIPELINE</span>
              <p className="text-[11px] text-slate-400 font-sans leading-normal">
                KION Labs가 추적하는 실제 경쟁 다차원 세그멘테이션 데이터 시뮬레이션입니다. 아래 지표들은 마우스 조작 없이도 실무 동향 변화에 맞춰 지속 반응합니다.
              </p>
            </div>

            {/* Sparkline list with live SVG renders */}
            <div className="space-y-3 select-none">
              {trackers.map(tracker => {
                const max = Math.max(...tracker.history);
                const min = Math.min(...tracker.history);
                const range = max - min || 1;

                // Points convert to coordinates in micro-sparkline block (width: 180, height: 32)
                const sparkHeight = 30;
                const sparkWidth = 140;
                const points = tracker.history.map((val, i) => {
                  const x = (i / (tracker.history.length - 1)) * sparkWidth;
                  const y = sparkHeight - 2 - ((val - min) / range) * (sparkHeight - 4);
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <div key={tracker.key} className="bg-sacramento-deep/30 border border-sacramento-light/10 hover:border-sacramento-bright/35 transition duration-300 p-3 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1 shrink-0 max-w-[140px]">
                      <span className="text-[10px] text-slate-400 font-bold block leading-tight truncate" title={tracker.name}>
                        {tracker.name.split(' (')[0]}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-white">{tracker.current}{tracker.unit}</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-extrabold flex items-center">
                          ▲ 가동중
                        </span>
                      </div>
                    </div>

                    {/* Highly satisfying micro SVG Sparkline */}
                    <div className="w-[140px] h-[30px] overflow-visible relative flex items-center">
                      <svg className="w-full h-full" viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}>
                        {/* Shimmer gradient effect beneath line */}
                        <path
                          d={`M 0,${sparkHeight} L ${points} L ${sparkWidth},${sparkHeight} Z`}
                          fill={`${tracker.color}0a`}
                        />
                        {/* Curve Path line */}
                        <polyline
                          fill="none"
                          stroke={tracker.color}
                          strokeWidth="2"
                          points={points}
                        />
                        {/* Terminal node */}
                        <circle
                          cx={sparkWidth}
                          cy={tracker.history[tracker.history.length - 1]}
                          r="2.5"
                          fill={tracker.color}
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Summary Strategy description */}
            <div className="bg-sacramento-deep/40 rounded-xl p-3 border border-sacramento-light/10 space-y-1 text-xs">
              <span className="text-sacramento-bright font-mono font-bold text-[9px] block uppercase tracking-wider">
                // 실시간 추적 대응 전략 (Real-time Tactical Feedback Loop)
              </span>
              <p className="text-[10.5px] text-slate-400 font-sans leading-normal">
                KION Labs는 업종별 세부 검색 의도가 포착될 때마다 해당 트래픽이 이중으로 손실되지 않도록 정비합니다. 경쟁사의 최신 블로그 노출 전략이나 플레이스 기여 이벤트를 자동 마이그레이션하여 상시 방어 상태를 수립합니다.
              </p>
            </div>

            {/* Bottom active telemetry stats indicator bar */}
            <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500 border-t border-sacramento-light/10 pt-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sacramento-bright animate-ping" />
                <span>24H 스키닝 리스너 정상 응답 중</span>
              </div>
              <span>RTT: 18ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
