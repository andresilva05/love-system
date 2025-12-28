import { CONFIG } from './config';
import Header from './components/Header';
import LiveTimer from './components/LiveTimer';
import StatsCard from './components/StatsCard';
import PhotoGallery from './components/PhotoGallery';
import QRCodeBox from './components/QrCodeBox';
import Timeline from './components/Timeline';
import MessageForm from './components/MessageForm';
import HeartsBackground from './components/HeartsBackground';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <HeartsBackground />
      
      <Header 
        title={CONFIG.messages.title}
        subtitle={CONFIG.messages.subtitle}
      />
      
      <LiveTimer />
      
      <section className="message-section">
        <h3>💌 Para Minha Esposa Maravilhosa</h3>
        <p className="love-message">{CONFIG.messages.dedication}</p>
      </section>
      
      <Timeline />
      <StatsCard />
      <PhotoGallery />
      <MessageForm />
      <QRCodeBox />
      
      <footer>
        <p>{CONFIG.messages.footer} | {new Date().getFullYear()}</p>
        <p style={{ 
          marginTop: '0.5rem', 
          fontSize: '0.9rem',
          opacity: 0.6 
        }}>
          Desde {CONFIG.startDate.toLocaleDateString('pt-BR')} • {CONFIG.coupleNames}
        </p>
      </footer>
    </div>
  );
}

export default App;