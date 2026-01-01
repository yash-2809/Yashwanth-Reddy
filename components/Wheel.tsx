
import React, { useState, useRef } from 'react';
import { Planet } from '../types';
import { NEON_COLORS } from '../constants';

interface WheelProps {
  onSpinEnd: (landedOn: Planet) => void;
  disabled?: boolean;
}

const Wheel: React.FC<WheelProps> = ({ onSpinEnd, disabled }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [locallyDisabled, setLocallyDisabled] = useState(false);

  const segments = [
    { name: Planet.NOVA, color: 'rgba(255, 0, 200, 0.1)', neon: '#ff00c8' },
    { name: Planet.ORBIT, color: 'rgba(0, 242, 255, 0.1)', neon: '#00f2ff' },
    { name: Planet.LUNAR, color: 'rgba(255, 255, 255, 0.05)', neon: '#ffffff' },
    { name: Planet.COSMOS, color: 'rgba(77, 255, 136, 0.1)', neon: '#4dff88' },
  ];

  const handleSpin = () => {
    if (isSpinning || disabled || locallyDisabled) return;

    setIsSpinning(true);
    setLocallyDisabled(true); // Immediate lock-out

    const extraDegrees = Math.floor(Math.random() * 360);
    const totalNewRotation = rotation + 2880 + extraDegrees; // Faster/Longer spin
    setRotation(totalNewRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDegrees = (360 - (totalNewRotation % 360)) % 360;
      let index = Math.floor(actualDegrees / 90);
      onSpinEnd(segments[index].name);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] group">
        {/* Glowing Outer Ring */}
        <div className="absolute inset-[-10px] rounded-full bg-gradient-to-tr from-neon-purple/20 to-neon-cyan/20 blur-xl opacity-50" />
        
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 z-50 drop-shadow-[0_0_10px_white]" 
             style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)', background: 'white' }} />
        
        {/* The Wheel - Glassmorphism style */}
        <div 
          className="w-full h-full rounded-full border-[10px] border-white/5 relative overflow-hidden transition-transform duration-[5000ms] cubic-bezier(0.15, 0, 0.15, 1) shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((seg, i) => (
            <div
              key={seg.name}
              className="absolute top-0 left-0 w-1/2 h-1/2 origin-bottom-right flex items-center justify-center p-8 border border-white/5"
              style={{ 
                transform: `rotate(${i * 90}deg)`,
                backgroundColor: seg.color,
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)'
              }}
            >
               <span className="font-orbitron font-bold text-sm md:text-base text-white/90 transform rotate-[45deg] text-center uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                {seg.name}
              </span>
            </div>
          ))}
          
          {/* Subtle reflections */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-30" />
        </div>

        {/* Inner Hub - Glowing Core */}
        <div className="absolute inset-0 m-auto w-16 h-16 bg-black border-4 border-white/10 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,1)]">
             <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_15px_white] animate-pulse" />
        </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={locallyDisabled || disabled}
        className={`relative overflow-hidden px-12 py-5 rounded-sm font-orbitron font-bold text-lg uppercase tracking-[0.4em] transition-all duration-300
          ${locallyDisabled || disabled 
            ? 'bg-black border border-gray-800 text-gray-700 cursor-not-allowed' 
            : 'bg-black border border-neon-cyan text-neon-cyan hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:bg-neon-cyan/5 active:scale-95'
          }`}
      >
        <span className="relative z-10">{isSpinning ? 'WARPING...' : 'SPIN THE GALAXY'}</span>
        {!locallyDisabled && !disabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:animate-shimmer" />
        )}
      </button>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Wheel;
