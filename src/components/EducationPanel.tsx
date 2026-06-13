import React, { useState } from 'react';
import { GraduationCap, Sparkles, Sliders, Play, Check, HelpCircle } from 'lucide-react';

interface PromptTemplate {
  name: string;
  technique: string;
  userPrompt: string;
  systemRole: string;
  expectedOutput: string;
}

const TEMPLATES: PromptTemplate[] = [
  {
    name: '제로샷 기본형 (Zero-Shot)',
    technique: '직접 발화식 질의',
    userPrompt: '예산 심의를 요청하는 이메일을 격식있게 작성해줘.',
    systemRole: '당신은 정중하고 유능한 업무 비서입니다.',
    expectedOutput: '제목: 예산 심의 일정 요청의 건\n\n안녕하세요, 기획실입니다.\n\n이번 주 중으로 3분기 예산 분배 현황의 적절성에 대한 간략한 팀 내 심의 회의를 가지고자 합니다. 편하신 일정을 공유 부탁드립니다. 감사합니다.'
  },
  {
    name: '생각의 고리 (Chain of Thought - CoT)',
    technique: '연쇄적 사고 분해',
    userPrompt: '영희는 책을 3권 가지고 있습니다. 그녀가 2권을 추가로 사고, 1권을 잃어버린 다음, 남은 책의 절반을 철수에게 선물했습니다. 이제 영희가 가진 책은 몇 권인가요?',
    systemRole: '당신은 매우 이성적이고 분석적인 분석 비서입니다. 한 단계씩 수식과 함께 추론 단계를 설명하세요.',
    expectedOutput: '1. 영희가 처음에 가지고 있던 책: 3권\n2. 책 2권을 새로 구매: 3 + 2 = 5권\n3. 1권을 분실: 5 - 1 = 4권\n4. 남은 책의 절반(4 / 2 = 2권)을 철수에게 선물\n5. 최종적으로 영희가 가진 책의 총량: 4 - 2 = 2권\n\n따라서 최종 정답은 2권입니다.'
  },
  {
    name: '퓨샷 개발자 지번 (Few-Shot)',
    technique: '동일 패턴 반복 제시',
    userPrompt: '입력: 커스텀 개발 패널. 출력:',
    systemRole: '당신은 개발 전문 코드 토크나이저입니다. UI 특징들을 토큰 규격으로 치환해 분류하세요.',
    expectedOutput: '결과 토큰: [PANEL_DEV] | 플래그: [INTERACTIVE, ACTIVE_AGENTS, WORKFLOW_SIM]'
  }
];

export default function EducationPanel() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(TEMPLATES[0]);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(0.9);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [responseText, setResponseText] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setResponseText('');
    
    // Simulate thinking network delay
    setTimeout(() => {
      const output = customPrompt 
        ? `[모의 모델 추론 출력 @ 온도: ${temperature}, TopP: ${topP}]\n\n입력된 사용자 정의 프롬프트 처리 완료: "${customPrompt}".\n\n수치 강도(${temperature})에 의거한 임의 편차 출력: 새크라멘토 계통 통합 관제 그리드를 통해 100% 최적화 상태로 프롬프트 전송 파이프라인 처리가 성공적으로 도출되었습니다.`
        : selectedTemplate.expectedOutput;
      
      setResponseText(output);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-gray-300">
      <div className="border border-sacramento-light/40 bg-sacramento-dark/60 p-5 rounded-xl shadow-inner md:flex md:items-center md:gap-4">
        <div className="p-3 bg-sacramento-light/30 rounded-lg text-sacramento-bright inline-block mb-3 md:mb-0">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-wide">인공지능 교육 제어실 (AI Learning Core)</h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            기업 비즈니스 관리자 및 실무 스쿼드를 위해 최첨단 대규모 언어 모델(LLM) 최적화 방법론, 프롬프트 엔지니어링 훈련 전술 및 사설 지식 네트워크 구축 실습을 지원합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Templates & Configurations */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="text-xs uppercase font-mono tracking-wider text-sacramento-bright font-bold block mb-2">
              체계적 학습 모듈 선택
            </label>
            <div className="space-y-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  onClick={() => {
                    setSelectedTemplate(tpl);
                    setCustomPrompt('');
                    setResponseText('');
                  }}
                  className={`w-full text-left p-2.5 rounded text-xs transition border font-mono flex flex-col gap-0.5 ${
                    selectedTemplate.name === tpl.name && !customPrompt
                      ? 'bg-sacramento-light/40 border-sacramento-bright text-white shadow-md'
                      : 'bg-sacramento-deep/50 border-sacramento-light/20 hover:border-sacramento-light text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-bold block text-sm">{tpl.name}</span>
                  <span className="text-[10px] text-slate-500 italic">설계 패턴: {tpl.technique}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Parameters Slider */}
          <div className="bg-sacramento-dark/90 p-4 rounded-lg border border-sacramento-light/25 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5 border-b border-sacramento-light/20 pb-2">
              <Sliders className="w-4.5 h-4.5" /> 모델 변량 제어판
            </h4>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span>창의 기발 표현도 (Temperature)</span>
                <span className="text-sacramento-bright font-bold">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-sacramento-deep accent-sacramento-bright"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>안정적·의존적 (0.1)</span>
                <span>극대 기발성 (1.5)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span>핵심 단어 분포 밀집도 (Top_P)</span>
                <span className="text-sacramento-bright font-bold">{topP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-sacramento-deep accent-sacramento-bright"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>엄밀한 패턴 (0.1)</span>
                <span>풍부한 다단어 검증 (1.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt Core & Simulated Result */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          {/* Active Settings HUD */}
          <div className="bg-sacramento-deep p-3.5 rounded border border-sacramento-light/30 text-xs font-mono space-y-2">
            <div>
              <span className="text-slate-500">인지 성격 역할 설정(System Role):</span>{' '}
              <span className="text-slate-300">"{selectedTemplate.systemRole}"</span>
            </div>
            <div>
              <span className="text-slate-500">활성 추론 패러다임:</span>{' '}
              <span className="text-sacramento-bright">{customPrompt ? '사용자 임의 분석 주입식' : selectedTemplate.name}</span>
            </div>
          </div>

          {/* Prompt Entry Box */}
          <div className="relative">
            <textarea
              className="w-full bg-sacramento-dark/80 text-gray-200 p-4 rounded-lg border border-sacramento-light text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-sacramento-bright h-28 resize-none"
              placeholder="또는 여기에 직접 검증할 테스트 프롬프트를 자유롭게 작성해 인프라를 지휘해보세요..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="absolute right-3 bottom-3 flex items-center gap-1 bg-sacramento-bright text-sacramento-deep px-3.5 py-1.5 rounded text-xs font-sans font-bold hover:bg-white transition disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              {isSimulating ? '정밀 추론 연산중...' : '가상 모델 추론'}
            </button>
          </div>

          {/* Model Response Sandbox */}
          <div className="bg-sacramento-deep border border-sacramento-light/30 rounded-lg p-4 flex-1 flex flex-col h-48">
            <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-sacramento-light/20 pb-2 mb-2">
              <span>결과 수신 터미널 // RESPONSE RECON_NODE_5</span>
              <span className={isSimulating ? 'text-sacramento-bright animate-pulse' : 'text-slate-400'}>
                {isSimulating ? '● 연산 추론 중' : '● 대기 상태'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-text">
              {isSimulating ? (
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-4/5 bg-sacramento-light/30 rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-sacramento-light/30 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-sacramento-light/30 rounded animate-pulse" />
                </div>
              ) : responseText ? (
                responseText
              ) : (
                <span className="text-slate-600 italic font-sans block pt-1 leading-normal">
                  "가상 모델 추론" 버튼을 눌러 결과 도출 메커니즘을 테스트하세요. 온도(Temperature) 슬라이더를 옮기며 예측 문장의 분산 폭이 어떻게 달라지는지 조감할 수 있습니다.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
