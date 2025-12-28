import { useState } from 'react';
import { CONFIG } from '../config';

function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="timeline-container" style={{
      background: 'var(--card-light)',
      borderRadius: '20px',
      padding: '2.5rem',
      margin: '3rem 0',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <h2 style={{
        color: 'var(--primary)',
        marginBottom: '2rem',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        📜 Nossa Linha do Tempo
      </h2>
      
      <div style={{
        position: 'relative',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Linha central */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: '0',
          bottom: '0',
          width: '4px',
          background: 'linear-gradient(180deg, var(--primary), var(--secondary))',
          transform: 'translateX(-50%)'
        }} />
        
        {CONFIG.timelineEvents.map((event, index) => (
          <div 
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              position: 'relative',
              marginBottom: '3rem',
              paddingLeft: '80px',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            {/* Ponto na linha */}
            <div style={{
              position: 'absolute',
              left: '48px',
              top: '0',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: activeIndex === index ? 'var(--secondary)' : 'var(--primary)',
              border: '4px solid var(--card-light)',
              transform: 'translateX(-50%)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              {event.icon}
            </div>
            
            {/* Card do evento */}
            <div style={{
              background: activeIndex === index ? 
                'linear-gradient(135deg, var(--primary), var(--primary-dark))' : 
                'var(--card-light)',
              border: `2px solid ${activeIndex === index ? 'transparent' : 'rgba(124, 58, 237, 0.1)'}`,
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: activeIndex === index ? 'var(--shadow-lg)' : 'var(--shadow)',
              transition: 'all 0.3s'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <h3 style={{
                  color: activeIndex === index ? 'white' : 'var(--text-light)',
                  fontSize: '1.3rem',
                  margin: 0
                }}>
                  {event.title}
                </h3>
                <span style={{
                  color: activeIndex === index ? 'rgba(255,255,255,0.8)' : 'var(--text-light)',
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {event.date}
                </span>
              </div>
              
              <p style={{
                color: activeIndex === index ? 'rgba(255,255,255,0.9)' : 'var(--text-light)',
                margin: 0,
                lineHeight: 1.6,
                opacity: 0.9
              }}>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;