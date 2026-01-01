
import React, { useMemo } from 'react';

const StarField: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 3}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020205] overflow-hidden pointer-events-none">
      {/* Nebula Layers */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,#300060_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#002050_0%,transparent_50%)] animate-pulse duration-[10s]" />
      
      {/* Drifting Nebula Clouds */}
      <div className="absolute inset-0 opacity-20 filter blur-[100px]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900 rounded-full animate-drift" style={{ animationDuration: '30s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full animate-drift-reverse" style={{ animationDuration: '45s' }} />
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-40 animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            // @ts-ignore
            '--duration': star.duration,
          }}
        />
      ))}

      {/* Shooting Stars */}
      <div className="shooting-star" />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, 50px); }
        }
        @keyframes drift-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-80px, -40px); }
        }
        .shooting-star {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px white, 0 0 20px white;
          animation: shoot 15s infinite linear;
          opacity: 0;
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(-45deg) scale(0); opacity: 0; }
          1% { opacity: 1; transform: translateX(0) translateY(0) rotate(-45deg) scale(1); }
          5% { transform: translateX(-500px) translateY(500px) rotate(-45deg) scale(1); opacity: 0; }
          100% { transform: translateX(-500px) translateY(500px) rotate(-45deg) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StarField;
