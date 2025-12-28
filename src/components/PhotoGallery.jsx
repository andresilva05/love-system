import { useState, useEffect, useCallback } from 'react';
import { CONFIG } from '../config';

function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // Verificar se as fotos existem
  useEffect(() => {
    const checkPhotos = async () => {
      setLoading(true);
      const existingPhotos = [];
      const errorList = [];
      
      // Testar cada foto
      for (let i = 0; i < CONFIG.photos.length; i++) {
        const photo = CONFIG.photos[i];
        try {
          const exists = await checkPhotoExists(photo);
          if (exists) {
            existingPhotos.push(photo);
          } else {
            errorList.push(`Foto não encontrada: ${photo}`);
          }
        } catch (error) {
          errorList.push(`Erro ao carregar: ${photo}`);
        }
      }
      
      setPhotos(existingPhotos);
      setErrors(errorList);
      setLoading(false);
    };
    
    checkPhotos();
  }, []);

  const checkPhotoExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

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

  // Teclado navegação - CORRIGIDO
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

  if (loading) {
    return (
      <div className="gallery-container">
        <h2>📸 Nossos Momentos</h2>
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center',
          opacity: 0.7 
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #7c3aed',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
          <p>Carregando suas memórias especiais...</p>
        </div>
      </div>
    );
  }

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
            Fotos não encontradas
          </h3>
          
          <p style={{ marginBottom: '1rem' }}>
            Verifique se suas fotos estão na pasta correta
          </p>
          
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>
              Enquanto isso, nossos momentos especiais:
            </h4>
            <div className="gallery-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="gallery-item" style={{
                  background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '1.5rem',
                  cursor: 'default'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
                    <div>Momento {num}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <div className="photo-label">
              Momento {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CORRIGIDO */}
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
              key={selectedIndex} // Importante: força recarregar ao mudar
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
            
            {/* Miniaturas na parte inferior */}
            <div style={{
              position: 'absolute',
              bottom: '-80px',
              left: '0',
              right: '0',
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              overflowX: 'auto'
            }}>
              {photos.map((photo, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: index === selectedIndex ? 1 : 0.5,
                    border: index === selectedIndex ? '2px solid white' : '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={photo} 
                    alt={`Miniatura ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;