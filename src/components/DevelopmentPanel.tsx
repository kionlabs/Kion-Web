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
    { id: '1', name: 'User Interaction Webhook', type: 'trigger', icon: <Zap className="w-4 h-4 text-amber-400" />, active: true, status: 'idle', desc: 'Triggered upon API payload ingestion' },
    { id: '2', name: 'Refinement Agent Core (Gemini)', type: 'llm', icon: <Workflow className="w-4 h-4 text-emerald-400" />, active: true, status: 'idle', desc: 'Auto-categorization and routing instructions' },
    { id: '3', name: 'Analytical Vector DB Sync', type: 'action', icon: <Database className="w-4 h-4 text-purple-400" />, active: true, status: 'idle', desc: 'Saves context payload into PostgreSQL/pgvector' },
    { id: '4', name: 'Notification Delivery Node', type: 'action', icon: <ShieldCheck className="w-4 h-4 text-sky-400" />, active: false, status: 'idle', desc: 'Slack channel alert dispatch on priority issues' },
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
      log("Initializing Pipeline Sandbox V1.4...");
      setNodes(prev => prev.map(n => n.id === '1' ? { ...n, status: 'running' } : n));
    }, 100);

    setTimeout(() => {
      if (nodes[0].active) {
        log("✔ Inbound webhook parsed successfully. Ingested payload ID: tx_9941a");
        setNodes(prev => prev.map(n => n.id === '1' ? { ...n, status: 'success' } : n));
      } else {
        log("⚠ Warning: Inbound webhook is bypassed. Using default mock payload.");
      }
      setNodes(prev => prev.map(n => n.id === '2' ? { ...n, status: 'running' } : n));
    }, 800);

    setTimeout(() => {
      if (nodes[1].active) {
        log("✔ Gemini LLM routing: classified token stream as HIGH PRIORITY.");
        log("✔ Dynamic context injected: 4 vector chunks matched.");
        setNodes(prev => prev.map(n => n.id === '2' ? { ...n, status: 'success' } : n));
      } else {
        log("⚠ Bypass: Gemini core bypassed. System using static routing.");
      }
      setNodes(prev => prev.map(n => n.id === '3' ? { ...n, status: 'running' } : n));
    }, 1600);

    setTimeout(() => {
      if (nodes[2].active) {
        log("✔ PostgreSQL Vector Database updated safely (100% vector similarity score).");
        setNodes(prev => prev.map(n => n.id === '3' ? { ...n, status: 'success' } : n));
      } else {
        log("✖ Bypassed PostgreSQL synchronization Node.");
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
      log("🎉 Pipeline Simulation Completed. System state stabilized.");
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
          <h3 className="text-xl font-display font-bold text-white tracking-wide">Custom Development Studio</h3>
          <p className="text-xs text-slate-400 mt-1">
            Build and string agentic systems into continuous, secure, and autoscaling backend pipelines. Toggle node paths to observe flow adjustments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flow Designer Visual */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center pb-1">
            <span className="text-xs uppercase font-mono tracking-wider text-sacramento-bright font-bold">
              Workflow Node Sequence
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              CLICK NODES TO ENABLE/DISABLE
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
                      <span className={!node.active ? 'line-through text-slate-600' : ''}>
                        {node.name}
                      </span>
                      {node.active && node.status !== 'idle' && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          node.status === 'running' 
                            ? 'bg-amber-400/20 text-amber-300 animate-pulse'
                            : 'bg-emerald-400/20 text-emerald-300'
                        }`}>
                          {node.status.toUpperCase()}
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
              {isRunning ? 'EXECUTION RUNNING' : 'RUN PIPELINE TEST'}
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Output Console */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-sacramento-deep border border-sacramento-light/40 rounded-xl p-4 flex-1 flex flex-col h-64">
            <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-sacramento-light/25 pb-2.5 mb-2.5">
              <span>SANDBOX TERMINAL STACK</span>
              <span className={isRunning ? 'text-amber-400 animate-pulse' : 'text-slate-500'}>
                {isRunning ? 'STREAMING ACTIVE' : 'DIAGNOSTIC IDLE'}
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
                  <span className="text-slate-600 italic">No output payload in compile register.</span>
                  <span className="text-[10px] text-slate-700 mt-0.5">Click "Run Pipeline Test" to monitor telemetry output.</span>
                </div>
              )}
            </div>
          </div>

          {/* Deployment HUD box */}
          {deployStep !== 'idle' && (
            <div className="bg-sacramento-dark/80 border border-sacramento-light/40 rounded-xl p-4 text-xs font-mono space-y-3">
              <div className="flex justify-between items-center">
                <span>Production Release State</span>
                <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${
                  deployStep === 'building' 
                    ? 'bg-yellow-400/20 text-yellow-300'
                    : 'bg-emerald-400/20 text-emerald-300'
                }`}>
                  {deployStep}
                </span>
              </div>
              
              {deployStep === 'building' ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Bundling Server...</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-sacramento-deep h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sacramento-bright h-full rounded-full transition-all duration-1000 w-full" />
                  </div>
                  <button
                    disabled
                    className="w-full bg-sacramento-light/20 text-slate-500 py-1.5 rounded text-[11px] cursor-not-allowed"
                  >
                    Packaging artifacts...
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-400">
                    Deploy secure micro-service to Cloud Run container cluster on Port 3000.
                  </p>
                  <button
                    onClick={handleDeploy}
                    className="w-full bg-sacramento-bright text-sacramento-deep font-sans font-bold py-1.5 rounded text-[11px] hover:bg-white transition cursor-pointer"
                  >
                    Deploy to Live Ingress
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
