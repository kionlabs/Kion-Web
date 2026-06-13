import React, { useState } from 'react';
import { Terminal, Database, Play, Check, ChevronRight, Workflow, ShieldCheck, Zap } from 'lucide-react';

interface DevNode {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'llm';
  icon: React.ReactNode;
  active: boolean;
  status: 'idle' | 'success' | 'running';
  desc: string;
}

export default function DevelopmentPanel() {
  const [nodes, setNodes] = useState<DevNode[]>([
    { id: '1', name: '유저 인풋 웹훅 수신장치', type: 'trigger', icon: <Zap className="w-4 h-4 text-amber-400" />, active: true, status: 'idle', desc: '실시간 API 페이로드 수신 시 인계 발동' },
    { id: '2', name: '분석 고도화 AI 에이전트 코어 (Gemini)', type: 'llm', icon: <Workflow className="w-4 h-4 text-emerald-400" />, active: true, status: 'idle', desc: '자동 흐름 카테고리 구성 및 유도식 실행 규칙 지시' },
    { id: '3', name: '벡터 데이터베이스 동기화 장치', type: 'action', icon: <Database className="w-4 h-4 text-purple-400" />, active: true, status: 'idle', desc: '수신된 엠베딩 데이터를 PostgreSQL/pgvector 아카이브에 인덱싱' },
    { id: '4', name: '슬랙 경보 비상 전송 노드', type: 'action', icon: <ShieldCheck className="w-4 h-4 text-sky-400" />, active: false, status: 'idle', desc: '중대 이슈가 감지되면 즉각 운영팀 슬랙 채널에 브리핑 패킷 전송' },
  ]);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [deployStep, setDeployStep] = useState<'idle' | 'building' | 'deployed'>('idle');

  const toggleNode = (id: string) => {
    if (isRunning) return;
    setNodes(nodes.map(n => n.id === id ? { ...n, active: !n.active } : n));
  };

  const handleRunPipeline = () => {
    setIsRunning(true);
    setTerminalLogs([]);
    setDeployStep('idle');
    
    const logs: string[] = [];
    const log = (msg: string) => {
      logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      setTerminalLogs([...logs]);
    };

    // Node-by-node runtime simulation
    setTimeout(() => {
      log("모의 파이프라인 가상 구동기 v1.4 초기화 중...");
      setNodes(prev => prev.map(n => n.id === '1' ? { ...n, status: 'running' } : n));
    }, 100);

    setTimeout(() => {
      if (nodes[0].active) {
        log("✔ 유입 웹훅 수집 분석 완료. 수집된 트랜잭션 식별자: tx_9941a");
        setNodes(prev => prev.map(n => n.id === '1' ? { ...n, status: 'success' } : n));
      } else {
        log("⚠ 경고: 패킷 웹훅 수동 생략됨. 기본 모의 페이로드를 조율해 활용합니다.");
      }
      setNodes(prev => prev.map(n => n.id === '2' ? { ...n, status: 'running' } : n));
    }, 800);

    setTimeout(() => {
      if (nodes[1].active) {
        log("✔ Gemini LLM 가중치 로빙 성공: 분류 토큰 결과값 [긴급 최우선 순위] 식별.");
        log("✔ 가변 문맥(Context) 주입 완료: 영속형 벡터 코어 데이터 4개 블록 매칭.");
        setNodes(prev => prev.map(n => n.id === '2' ? { ...n, status: 'success' } : n));
      } else {
        log("⚠ 무시됨: Gemini 지능 연산 모듈 스킵. 수동 스태틱 분기 방식으로 회항합니다.");
      }
      setNodes(prev => prev.map(n => n.id === '3' ? { ...n, status: 'running' } : n));
    }, 1600);

    setTimeout(() => {
      if (nodes[2].active) {
        log("✔ PostgreSQL 기반 시맨틱 유사도 분석 및 색인 완결 (벡터 정합성 100%).");
        setNodes(prev => prev.map(n => n.id === '3' ? { ...n, status: 'success' } : n));
      } else {
        log("✖ 경고: PostgreSQL 데이터베이스 실시간 영속화 세그먼트 생략.");
      }
      setNodes(prev => prev.map(n => n.id === '4' ? { ...n, status: 'running' } : n));
    }, 2400);

    setTimeout(() => {
      if (nodes[3].active) {
        log("✔ Slack priority dispatch channel successfully received security hook.");
        setNodes(prev => prev.map(n => n.id === '4' ? { ...n, status: 'success' } : n));
      } else {
        log("ℹ Slack dispatch inactive. Pipeline bypass completed.");
      }
      log("🎉 파이프라인 자율 모의 연산 전과정 수립 완료. 시스템 무결성 유지 완료.");
      setIsRunning(false);
      setDeployStep('building');
    }, 3200);
  };

  const handleDeploy = () => {
    setDeployStep('building');
    setTimeout(() => {
      setDeployStep('deployed');
    }, 1500);
  };

  return (
    <div className="space-y-6 text-gray-300">
      <div className="border border-sacramento-light/40 bg-sacramento-dark/60 p-5 rounded-xl shadow-inner md:flex md:items-center md:gap-4">
        <div className="p-3 bg-sacramento-light/30 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0">
          <Terminal className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-wide">지능형 인프라 개발 스튜디오 (Custom Dev Studio)</h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            사설 에이전트 계통망을 구축하고 지속 가능하며 안전한 고성능 백엔드 파이프라인에 연결을 구축합니다. 모듈 스위치를 켜고 꺼서 실시간 의존 제어 흐름을 테스트하세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flow Designer Visual */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center pb-1">
            <span className="text-xs uppercase font-mono tracking-wider text-sacramento-bright font-bold">
              아키텍처 파이프라인 시퀀스
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              개별 모듈 클릭 시 무선 활성화 / 비활성화
            </span>
          </div>

          <div className="space-y-3 relative">
            {nodes.map((node, idx) => (
              <div key={node.id} className="relative">
                {idx < nodes.length - 1 && (
                  <div className="absolute left-[23px] top-[50px] w-0.5 h-6 bg-sacramento-light/30 -z-1" />
                )}
                
                <button
                  onClick={() => toggleNode(node.id)}
                  disabled={isRunning}
                  className={`w-full text-left p-3 rounded-lg border flex items-center gap-3.5 transition ${
                    node.active
                      ? 'bg-sacramento-dark border-sacramento-light/80 hover:border-sacramento-bright shadow-md'
                      : 'bg-sacramento-deep/40 border-sacramento-light/10 text-slate-500 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className={`p-2 rounded-md ${
                    node.active 
                      ? 'bg-sacramento-light/40' 
                      : 'bg-sacramento-deep'
                  }`}>
                    {node.icon}
                  </div>
                  
                  <div className="flex-1 text-xs">
                    <div className="font-mono font-bold text-slate-200 flex items-center gap-1.5 justify-between">
                      <span className={!node.active ? 'line-through text-slate-600 font-sans' : 'font-sans'}>
                        {node.name}
                      </span>
                      {node.active && node.status !== 'idle' && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          node.status === 'running' 
                            ? 'bg-amber-400/20 text-amber-300 animate-pulse'
                            : 'bg-emerald-400/20 text-emerald-300'
                        }`}>
                          {node.status === 'running' ? '실행 연산중' : '수립 가동 완결'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">{node.desc}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleRunPipeline}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sacramento-light to-sacramento-bright text-white py-2.5 rounded-lg text-xs font-mono font-bold hover:brightness-110 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunning ? '자율 패킷 순차 연산중...' : '파이프라인 자율 모의 연산 구동'}
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Output Console */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-sacramento-deep border border-sacramento-light/40 rounded-xl p-4 flex-1 flex flex-col h-64">
            <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-sacramento-light/25 pb-2.5 mb-2.5">
              <span>지휘 감시 인프라 터미널</span>
              <span className={isRunning ? 'text-amber-400 animate-pulse' : 'text-slate-500'}>
                {isRunning ? '실시간 데이터 수집 분석 가동' : '대기 상태'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1.5 leading-relaxed">
              {terminalLogs.length > 0 ? (
                terminalLogs.map((log, i) => (
                  <div key={i} className="animate-fade-in hover:bg-sacramento-light/10 p-0.5 rounded px-1 transition">
                    {log}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Terminal className="w-8 h-8 text-sacramento-light/50 mb-2 animate-pulse" />
                  <span className="text-slate-600 italic font-sans">컴파일 덤프 레지스터상 데이터가 비어 있습니다.</span>
                  <span className="text-[10px] text-slate-700 mt-0.5 font-sans">"파이프라인 자율 모의 연산 구동"을 동작시켜 흘러가는 펄스 로그를 확인하세요.</span>
                </div>
              )}
            </div>
          </div>

          {/* Deployment HUD box */}
          {deployStep !== 'idle' && (
            <div className="bg-sacramento-dark/80 border border-sacramento-light/40 rounded-xl p-4 text-xs font-mono space-y-3">
              <div className="flex justify-between items-center">
                <span>상용 운영 가용한 배포 환경 이식 단계</span>
                <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${
                  deployStep === 'building' 
                    ? 'bg-yellow-400/20 text-yellow-300'
                    : 'bg-emerald-400/20 text-emerald-300'
                }`}>
                  {deployStep === 'building' ? '서버 패키징 빌드중' : '인쇄 배포 완결'}
                </span>
              </div>
              
              {deployStep === 'building' ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>안전 포장 및 최적 통합화 수렴 과정...</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-sacramento-deep h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sacramento-bright h-full rounded-full transition-all duration-1000 w-full" />
                  </div>
                  <button
                    disabled
                    className="w-full bg-sacramento-light/20 text-slate-500 py-1.5 rounded text-[11px] cursor-not-allowed font-sans font-bold"
                  >
                    아티팩트 격리 패킹 프로세스 구동중...
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-400 font-sans">
                    생성된 시큐어 파이크를 클라우드 런 포트 3000번 단독 컨테이너 호스팅 네트워크 대역에 안정 배포합니다.
                  </p>
                  <button
                    onClick={handleDeploy}
                    className="w-full bg-sacramento-bright text-sacramento-deep font-sans font-bold py-1.5 rounded text-[11px] hover:bg-white transition cursor-pointer"
                  >
                    이식 모듈 최종 실서버 배포 적용
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
