import { useState, useEffect } from "react";
import { intervalToDuration, differenceInSeconds } from "date-fns";
import { CONFIG } from "../config";

function LiveTimer() {
  // Data de início: 04 de janeiro de 2023
  const START_DATE = new Date(2023, 0, 4); // Janeiro = 0, Fevereiro = 1, etc.
  
  const [time, setTime] = useState({
    years: 0, months: 0, days: 0,
    hours: 0, minutes: 0, seconds: 0,
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updateTimer = () => {
      const now = new Date();
      
      // Calcula a diferença total usando intervalToDuration
      const duration = intervalToDuration({
        start: START_DATE,
        end: now
      });
      
      // Calcula diferença total em segundos
      const totalSeconds = differenceInSeconds(now, START_DATE);
      
      // Calcula dias totais
      const totalDays = Math.floor(totalSeconds / 86400);
      
      // Calcula horas, minutos, segundos CORRETAMENTE
      // O que sobra depois de remover os dias completos
      const remainingSeconds = totalSeconds % 86400;
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;
      
      setTime({
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalDays: totalDays,
        totalHours: Math.floor(totalSeconds / 3600),
        totalMinutes: Math.floor(totalSeconds / 60)
      });
    };

    // Atualiza imediatamente e depois a cada segundo
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return (
      <div className="timer-container">
        <h2>⏳ Nossa Jornada Juntos</h2>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          Carregando nosso tempo juntos...
        </div>
      </div>
    );
  }

  // Cálculos extras para mensagens personalizadas
  const calculateMonthsTotal = () => {
    return time.years * 12 + time.months;
  };

  const calculateWeeksTotal = () => {
    return Math.floor(time.totalDays / 7);
  };

  return (
    <div className="timer-container">
      <h2>⏳ Nossa Jornada Juntos</h2>
      <p style={{ opacity: 0.7, marginBottom: '1rem' }}>
        Desde 04 de Janeiro de 2023
      </p>
      
      <div className="time-grid">
        <TimeUnit value={time.years} label="Anos" />
        <TimeUnit value={time.months} label="Meses" />
        <TimeUnit value={time.days} label="Dias" />
        <TimeUnit value={time.hours} label="Horas" />
        <TimeUnit value={time.minutes} label="Minutos" />
        <TimeUnit value={time.seconds} label="Segundos" />
      </div>
      
      {/* Estatísticas detalhadas */}
      <div style={{
        marginTop: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <StatBox 
          value={time.totalDays.toLocaleString()} 
          label="Dias de amor" 
          color="#7c3aed"
        />
        <StatBox 
          value={calculateMonthsTotal().toLocaleString()} 
          label="Meses completos" 
          color="#db2777"
        />
        <StatBox 
          value={calculateWeeksTotal().toLocaleString()} 
          label="Semanas juntos" 
          color="#f59e0b"
        />
        <StatBox 
          value={time.totalHours.toLocaleString()} 
          label="Horas de felicidade" 
          color="#10b981"
        />
      </div>
      
      {/* Mensagem dinâmica baseada no tempo */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(219, 39, 119, 0.1))',
        borderRadius: '10px',
        fontSize: '1.1rem',
        borderLeft: '4px solid #7c3aed'
      }}>
        {time.totalDays > 730 ? (
          <span>Mais de <strong>2 anos</strong> de amor ininterrupto! 💕</span>
        ) : time.totalDays > 365 ? (
          <span>Já passamos <strong>1 ano</strong> juntos! 🎉</span>
        ) : time.totalDays > 180 ? (
          <span>Mais de <strong>6 meses</strong> de pura felicidade! ✨</span>
        ) : (
          <span><strong>{time.totalDays.toLocaleString()}</strong> dias construindo nossa história! 💖</span>
        )}
      </div>
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="time-unit">
      <span className="time-value">{value.toString().padStart(2, "0")}</span>
      <span className="time-label">{label}</span>
    </div>
  );
}

function StatBox({ value, label, color }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
      border: `2px solid ${color}20`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        color: color,
        marginBottom: '0.3rem'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.9rem',
        color: '#666',
        fontWeight: '500'
      }}>
        {label}
      </div>
    </div>
  );
}

export default LiveTimer;