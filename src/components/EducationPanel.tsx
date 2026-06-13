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
    name: 'Zero-Shot Baseline',
    technique: 'Direct query',
    userPrompt: 'Write an email asking for a budget review.',
    systemRole: 'You are a helpful assistant.',
    expectedOutput: 'Subject: Budget Review Request\n\nDear Team,\n\nCould we please schedule a quick review of the current Q3 budget allocations sometime this week? Thank you.'
  },
  {
    name: 'Chain of Thought (CoT)',
    technique: 'Reasoning breakdown',
    userPrompt: 'Sally has 3 books. She buys 2 more, loses 1, and gives half of the remaining to Bob. How many does Sally have?',
    systemRole: 'You are an analytical assistant. Explain your step-by-step reasoning.',
    expectedOutput: '1. Sally starts with 3 books.\n2. She buys 2 more: 3 + 2 = 5 books.\n3. She loses 1: 5 - 1 = 4 books.\n4. She gives half of the remaining (4 / 2 = 2 books) to Bob.\n5. Sally has 4 - 2 = 2 books remaining.\n\nAnswer: Sally has 2 books.'
  },
  {
    name: 'Few-Shot Developer',
    technique: 'Examples-based format',
    userPrompt: 'Input: Custom Dev Panel. Output:',
    systemRole: 'You are an interface tagger. Convert UI features into code tokens.',
    expectedOutput: 'Token: [PANEL_DEV] | Flags: [INTERACTIVE, ACTIVE_AGENTS, WORKFLOW_SIM]'
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
        ? `[Simulated Model Output @ Temp: ${temperature}, TopP: ${topP}]\n\nProcessed custom prompt: "${customPrompt}".\n\nOutput variation determined by temperature ${temperature}: The custom routing matrix completed with 100% confidence utilizing Space-Grotesk display grids.`
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
          <h3 className="text-xl font-display font-bold text-white tracking-wide">AI Learning Core</h3>
          <p className="text-xs text-slate-400 mt-1">
            Empowering client squads and corporate managers with state-of-the-art LLM optimization, prompt engineering tactics, and local context pipelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Templates & Configurations */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="text-xs uppercase font-mono tracking-wider text-sacramento-bright font-bold block mb-2">
              Select Curricula Module
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
                  <span className="text-[10px] text-slate-500 italic">Technique: {tpl.technique}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Parameters Slider */}
          <div className="bg-sacramento-dark/90 p-4 rounded-lg border border-sacramento-light/25 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5 border-b border-sacramento-light/20 pb-2">
              <Sliders className="w-4.5 h-4.5" /> Parametric Controls
            </h4>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span>Temperature (Creativity)</span>
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
                <span>Deterministic (0.1)</span>
                <span>Highly Creative (1.5)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span>Top_P (Nucleus Sampling)</span>
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
                <span>Narrow Vocabulary (0.1)</span>
                <span>Broad Spectrum (1.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt Core & Simulated Result */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          {/* Active Settings HUD */}
          <div className="bg-sacramento-deep p-3.5 rounded border border-sacramento-light/30 text-xs font-mono space-y-2">
            <div>
              <span className="text-slate-500">System Role:</span>{' '}
              <span className="text-slate-300">"{selectedTemplate.systemRole}"</span>
            </div>
            <div>
              <span className="text-slate-500">Active Paradigm:</span>{' '}
              <span className="text-sacramento-bright">{customPrompt ? 'Custom Agent Input' : selectedTemplate.name}</span>
            </div>
          </div>

          {/* Prompt Entry Box */}
          <div className="relative">
            <textarea
              className="w-full bg-sacramento-dark/80 text-gray-200 p-4 rounded-lg border border-sacramento-light text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-sacramento-bright h-28 resize-none"
              placeholder="Or write/test your custom prompt queries here..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="absolute right-3 bottom-3 flex items-center gap-1 bg-sacramento-bright text-sacramento-deep px-3.5 py-1.5 rounded text-xs font-sans font-bold hover:bg-white transition disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              {isSimulating ? 'Processing...' : 'Simulate LLM'}
            </button>
          </div>

          {/* Model Response Sandbox */}
          <div className="bg-sacramento-deep border border-sacramento-light/30 rounded-lg p-4 flex-1 flex flex-col h-48">
            <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-sacramento-light/20 pb-2 mb-2">
              <span>OUTPUT TERMINAL // RESPONSE RECON_NODE_5</span>
              <span className={isSimulating ? 'text-sacramento-bright animate-pulse' : 'text-slate-400'}>
                {isSimulating ? '● GENERATING' : '● IDLE'}
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
                <span className="text-slate-600 italic">Click "Simulate LLM" to generate prompt response output. Feel free to tweak temperature to watch outputs alter.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
