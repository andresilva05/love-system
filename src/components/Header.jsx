import ThemeToggle from './ThemeToggle';

function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
      <div style={{ 
        marginTop: '1rem',
        fontSize: '1.5rem',
        animation: 'pulse 2s infinite' 
      }}>
        💖
      </div>
    </header>
  );
}

export default Header;