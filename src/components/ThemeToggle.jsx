import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || 
           (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        background: 'var(--card-light)',
        border: '2px solid rgba(124, 58, 237, 0.2)',
        borderRadius: '50px',
        width: '60px',
        height: '30px',
        position: 'relative',
        cursor: 'pointer',
        padding: 0,
        transition: 'all 0.3s'
      }}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      <div style={{
        position: 'absolute',
        top: '2px',
        left: isDark ? '32px' : '2px',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: isDark ? 'var(--primary)' : 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'left 0.3s'
      }}>
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
}

export default ThemeToggle;