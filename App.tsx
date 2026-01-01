
import React, { useState, useEffect } from 'react';
import StarField from './components/StarField';
import Wheel from './components/Wheel';
import MissionTerminal from './components/MissionTerminal';
import { Planet, UserState, Mission } from './types';
import { STORAGE_KEY } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<UserState>({
    hasSpun: false,
    landedPlanet: null,
    mission: null,
    status: 'idle',
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setState({
        ...parsed,
        // If they already have a mission, stay ready. 
        // If they spun but didn't finish loading, they are still "loading" or "locked"
        status: parsed.mission ? 'ready' : (parsed.hasSpun ? 'loading_mission' : 'idle'),
      });

      if (parsed.hasSpun && !parsed.mission && parsed.landedPlanet) {
        fetchMission(parsed.landedPlanet);
      }
    }
  }, []);

  // Strict persistence
  useEffect(() => {
    if (state.hasSpun) {
      const { status, ...rest } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    }
  }, [state.hasSpun, state.mission, state.landedPlanet]);

  const fetchMission = async (planet: Planet) => {
    setState(prev => ({ ...prev, status: 'loading_mission' }));
    try {
      const mission = await geminiService.generateMission(planet);
      setState(prev => ({
        ...prev,
        mission,
        status: 'ready'
      }));
    } catch (error) {
      console.error("Link Failure:", error);
      setTimeout(() => fetchMission(planet), 3000); // Auto-retry for mission critical tasks
    }
  };

  const handleSpinEnd = (planet: Planet) => {
    setState(prev => ({
      ...prev,
      hasSpun: true,
      landedPlanet: planet,
      status: 'loading_mission'
    }));
    fetchMission(planet);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6 overflow-x-hidden text-white selection:bg-neon-cyan/30">
      <StarField />

      {/* Header */}
      <header className="text-center mb-20 space-y-6 relative z-10">
        <h1 className="font-orbitron text-4xl md:text-8xl font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 animate-pulse">
          Galaxy Spin Challenge
        </h1>
        <div className="h-[2px] w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <p className="font-rajdhani text-xl md:text-3xl text-neon-cyan tracking-[0.5em] font-medium uppercase">
          Spin. Code. Conquer.
        </p>
      </header>

      <main className="w-full flex flex-col items-center relative z-10 flex-grow">
        {state.status === 'idle' && !state.hasSpun && (
          <div className="space-y-16 text-center animate-in fade-in zoom-in duration-1000">
            <section className="max-w-2xl mx-auto space-y-8">
              <h2 className="font-orbitron text-3xl text-white tracking-widest uppercase">
                Ready to Conquer the Galaxy?
              </h2>
              <p className="font-rajdhani text-xl text-gray-500 leading-relaxed">
                The Interstellar Coding League has identified your signal. 
                Your destination is determined by the celestial alignment. 
                Spin the wheel to lock in your destiny.
              </p>
            </section>
            <Wheel onSpinEnd={handleSpinEnd} />
          </div>
        )}

        {state.status === 'loading_mission' && (
          <div className="flex flex-col items-center gap-12 py-24">
            <div className="relative">
              <div className="w-32 h-32 border-[1px] border-white/10 rounded-full" />
              <div className="absolute inset-0 w-32 h-32 border-t-2 border-neon-cyan rounded-full animate-spin" />
              <div className="absolute inset-4 w-24 h-24 border-b-2 border-neon-pink rounded-full animate-spin-slow opacity-50" />
            </div>
            <div className="text-center space-y-4">
              <p className="font-orbitron text-2xl tracking-[0.3em] text-white">Quantum Link Active</p>
              <p className="font-rajdhani text-neon-cyan uppercase tracking-[0.2em] text-sm">
                Retrieving Mission Data for {state.landedPlanet}...
              </p>
            </div>
          </div>
        )}

        {state.status === 'ready' && state.mission && (
          <MissionTerminal mission={state.mission} />
        )}

        {/* Locked Message - No second spin allowed */}
        {state.hasSpun && state.status !== 'ready' && state.status !== 'loading_mission' && (
          <div className="text-center py-24 space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
             <div className="flex flex-col items-center gap-6">
                <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl">
                   <h3 className="font-orbitron text-5xl text-white font-black tracking-tighter mb-4">DESTINY LOCKED</h3>
                   <div className="h-1 w-24 bg-neon-pink mx-auto mb-6" />
                   <p className="font-rajdhani text-2xl text-gray-400 max-w-lg mx-auto leading-relaxed">
                     You have already spun the wheel.<br/>
                     <span className="text-white/60">The galaxy allows only one chance.</span>
                   </p>
                </div>
                
                <button 
                  onClick={() => setState(prev => ({ ...prev, status: 'ready' }))}
                  className="px-10 py-4 bg-white/5 border border-white/20 rounded-full font-orbitron text-sm tracking-[0.2em] hover:bg-white/10 transition-all uppercase"
                >
                  Return to Mission Briefing
                </button>
             </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-8 border-t border-white/5 w-full text-center opacity-40 font-rajdhani text-[10px] tracking-[1em] uppercase">
        System Status: Nominal | ICL-OS v2.0
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
