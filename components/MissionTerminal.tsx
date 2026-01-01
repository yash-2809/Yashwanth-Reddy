
import React from 'react';
import { Mission } from '../types';
import { PLANET_COLORS, HACKERRANK_URLS } from '../constants';

interface MissionTerminalProps {
  mission: Mission;
  onClose?: () => void;
}

const MissionTerminal: React.FC<MissionTerminalProps> = ({ mission, onClose }) => {
  const planetColor = PLANET_COLORS[mission.planet];

  const handleAccept = () => {
    const url = HACKERRANK_URLS[mission.planet];
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-white/10 p-5 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
          </div>
          <div className="font-rajdhani text-xs text-white/40 tracking-[0.4em] uppercase">
            Encrypted Uplink // Sector: {mission.planet}
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-8 md:p-12 space-y-12">
          <header className="space-y-4">
            <div className={`inline-block px-4 py-1.5 rounded-sm text-[10px] font-black text-white uppercase tracking-widest bg-gradient-to-r ${planetColor}`}>
              Mission: Verified
            </div>
            <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white tracking-tight leading-none">
              {mission.title}
            </h1>
          </header>

          <section className="space-y-6">
            <div className="flex items-start gap-6">
              <span className="text-white/20 font-mono text-2xl mt-1 select-none">//</span>
              <p className="text-gray-400 font-rajdhani text-xl leading-relaxed">
                {mission.description}
              </p>
            </div>
          </section>

          <section className="space-y-6 bg-white/[0.02] p-8 rounded-xl border border-white/5">
            <h2 className="text-white/40 font-orbitron uppercase text-xs tracking-[0.5em]">Primary Objective</h2>
            <p className="text-white font-rajdhani text-2xl italic font-light tracking-wide">
              "{mission.objective}"
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-white/30 font-rajdhani text-[10px] uppercase tracking-[0.3em]">Sample Input</h3>
              <pre className="bg-black/80 p-6 rounded-lg border border-white/5 font-mono text-white/80 text-sm overflow-x-auto shadow-inner">
                {mission.sampleInput}
              </pre>
            </div>
            <div className="space-y-3">
              <h3 className="text-white/30 font-rajdhani text-[10px] uppercase tracking-[0.3em]">Expected Output</h3>
              <pre className="bg-black/80 p-6 rounded-lg border border-white/5 font-mono text-neon-cyan text-sm overflow-x-auto shadow-inner">
                {mission.sampleOutput}
              </pre>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-6">
            <button 
              onClick={handleAccept}
              className="group relative px-12 py-5 bg-white text-black font-black font-orbitron text-sm tracking-[0.3em] uppercase hover:bg-neon-cyan transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,242,255,0.6)]"
            >
              Start Conquest
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <p className="font-rajdhani text-gray-600 text-[10px] tracking-[0.2em] uppercase">Redirecting to HackerRank secure environment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTerminal;
