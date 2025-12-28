import { useMemo } from 'react';

// Função pura para gerar valores aleatórios de forma determinística
function generateRandomValues(seed) {
  // Usar uma função pseudo-aleatória simples baseada no seed
  function mulberry32(seed) {
    return function() {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  
  const random = mulberry32(seed);
  return {
    random: () => random(),
    randomInt: (max) => Math.floor(random() * max),
    randomRange: (min, max) => random() * (max - min) + min
  };
}

function HeartsBackground() {
  const hearts = useMemo(() => {
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💞', '💝'];
    
    // Gerar corações de forma determinística
    return Array.from({ length: 15 }).map((_, i) => {
      // Usar um seed baseado no índice para que seja determinístico
      const rng = generateRandomValues(i + 1000); // +1000 para variar entre componentes
      
      return {
        id: i,
        emoji: heartEmojis[rng.randomInt(heartEmojis.length)],
        size: rng.randomRange(16, 40),
        left: rng.randomRange(0, 100),
        top: rng.randomRange(0, 100),
        delay: rng.randomRange(0, 5),
        speed: rng.randomRange(2, 5)
      };
    });
  }, []); // Array vazio = apenas na montagem inicial

  return (
    <div className="hearts-background">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: `${heart.size}px`,
            animation: `float ${heart.speed}s infinite ease-in-out`,
            animationDelay: `${heart.delay}s`,
            opacity: 0.15,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -1
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}

export default HeartsBackground;