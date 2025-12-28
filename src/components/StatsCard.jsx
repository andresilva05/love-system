import { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';
import { CONFIG } from '../config';

function StatsCard() {
  const [stats, setStats] = useState({
    totalDays: 0,
    weekends: 0,
    heartbeats: 0,
    fullMoons: 0,
    kisses: 0,
    laughs: 0,
    adventures: 0,
    sunsets: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const now = new Date();
      const start = CONFIG.startDate;
      
      const totalDays = differenceInDays(now, start);
      const totalHours = differenceInHours(now, start);
    //   const totalMinutes = differenceInMinutes(now, start);
      
      // Cálculos criativos
      setStats({
        totalDays,
        weekends: Math.floor(totalDays / 7 * 2),
        heartbeats: Math.floor(totalHours * 3600 * 70), // 70 bpm em média
        fullMoons: Math.floor(totalDays / 29.53),
        kisses: Math.floor(totalDays * 10), // 10 beijos por dia em média
        laughs: Math.floor(totalHours * 2), // 2 risadas por hora
        adventures: Math.floor(totalDays / 30), // 1 aventura por mês
        sunsets: totalDays // cada dia tem um pôr do sol
      });
    };

    calculateStats();
    const interval = setInterval(calculateStats, 60000); // Atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stats-container">
      <h2>📊 Em Números do Nosso Amor</h2>
      <div className="stats-grid">
        <StatItem value={stats.totalDays} label="Dias de aventura" icon="📅" />
        <StatItem value={stats.weekends} label="Finais de semana" icon="🎉" />
        <StatItem value={stats.heartbeats.toLocaleString()} label="Batidas do coração" icon="💓" />
        <StatItem value={stats.fullMoons} label="Luas cheias" icon="🌕" />
        <StatItem value={stats.kisses.toLocaleString()} label="Beijos trocados" icon="💋" />
        <StatItem value={stats.laughs.toLocaleString()} label="Risadas compartilhadas" icon="😂" />
        <StatItem value={stats.adventures} label="Aventuras juntos" icon="🗺️" />
        <StatItem value={stats.sunsets} label="Pôres do sol" icon="🌅" />
      </div>
    </div>
  );
}

function StatItem({ value, label, icon }) {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value.toLocaleString()}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default StatsCard;