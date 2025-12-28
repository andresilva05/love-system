import { useState, useEffect, useCallback } from 'react';
import { allImages } from '../utils/imageImporter';

function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [photos] = useState(allImages);
  const [loading] = useState(false); // Agora é sempre false pois as imagens já estão carregadas

  // Funções de navegação
  const openModal = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const nextPhoto = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex(prev => {
      if (prev === null || photos.length === 0) return null;
      return prev === photos.length - 1 ? 0 : prev + 1;
    });
  }, [photos.length]);

  const prevPhoto = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex(prev => {
      if (prev === null || photos.length === 0) return null;
      return prev === 0 ? photos.length - 1 : prev - 1;
    });
  }, [photos.length]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedIndex(prev => prev === photos.length - 1 ? 0 : prev + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? photos.length - 1 : prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length, closeModal]);

  // Se não houver fotos (não deve acontecer agora)
  if (photos.length === 0) {
    return (
      <div className="gallery-container">
        <h2>📸 Nossos Momentos</h2>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          background: 'rgba(124, 58, 237, 0.05)',
          borderRadius: '12px',
          border: '2px dashed rgba(124, 58, 237, 0.3)',
          margin: '1rem 0'
        }}>
          <h3 style={{ color: '#7c3aed', marginBottom: '1rem' }}>
            Nenhuma foto encontrada
          </h3>
          <p>Adicione fotos na pasta src/assets/</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h2>📸 Nossos Momentos</h2>
      <p style={{ opacity: 0.7, marginBottom: '1rem' }}>
        {photos.length} memórias especiais • Clique para ampliar
      </p>
      
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openModal(index)}
            onKeyDown={(e) => e.key === 'Enter' && openModal(index)}
            tabIndex={0}
            role="button"
            aria-label={`Ver foto ${index + 1} ampliada`}
          >
            <img 
              src={photo} 
              alt={`Momento especial ${index + 1}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
              color: 'white',
              padding: '0.5rem',
              fontSize: '0.8rem',
              opacity: 0,
              transition: 'opacity 0.3s',
              textAlign: 'center'
            }} className="photo-label">
              Momento {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && photos[selectedIndex] && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={closeModal}
              aria-label="Fechar visualização"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
            >
              ×
            </button>
            
            <button 
              className="modal-nav prev"
              onClick={prevPhoto}
              aria-label="Foto anterior"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
            >
              ‹
            </button>
            
            <img 
              src={photos[selectedIndex]} 
              alt={`Foto ${selectedIndex + 1} de ${photos.length}`}
              className="modal-image"
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
              }}
              key={selectedIndex}
            />
            
            <button 
              className="modal-nav next"
              onClick={nextPhoto}
              aria-label="Próxima foto"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
            >
              ›
            </button>
            
            <div className="modal-counter"
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                right: '0',
                textAlign: 'center',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}
            >
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;