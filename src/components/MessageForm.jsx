import { useState } from 'react';

function MessageForm() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // SEU NÚMERO DE WHATSAPP - FORMATE ASSIM: 5511999999999 (código país + DDD + número)
  const YOUR_PHONE_NUMBER = '5514998467362'; // Substitua pelo seu número

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Por favor, preencha seu nome e sua mensagem!');
      return;
    }
    
    setIsSubmitting(true);
    
    // Formata a mensagem para o WhatsApp
    const formattedMessage = `*Mensagem de ${formData.name}*\n\n${formData.message}\n\n_Enviada através do site Nosso Amor_`;
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(formattedMessage);
    
    // Cria a URL do WhatsApp
    const whatsappUrl = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${encodedMessage}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
    
    // Limpa o formulário
    setFormData({ name: '', message: '' });
    
    // Reseta o estado após 2 segundos
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="message-form-container">
      <h2 style={{
        color: 'var(--primary)',
        marginBottom: '2rem',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        📝 Deixe seu Recado
      </h2>

      <p style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: 'var(--text-light)',
        opacity: 0.8,
        maxWidth: '600px',
        margin: '0 auto 2rem'
      }}>
        Sua mensagem será enviada diretamente para o WhatsApp do casal.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'var(--text-light)',
            fontWeight: '500'
          }}>
            Seu Nome
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Digite seu nome"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '10px',
              border: '2px solid rgba(124, 58, 237, 0.2)',
              background: 'var(--card-light)',
              color: 'var(--text-light)',
              fontSize: '1rem',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(124, 58, 237, 0.2)'}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'var(--text-light)',
            fontWeight: '500'
          }}>
            Sua Mensagem
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Escreva uma mensagem especial para o casal..."
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '10px',
              border: '2px solid rgba(124, 58, 237, 0.2)',
              background: 'var(--card-light)',
              color: 'var(--text-light)',
              fontSize: '1rem',
              resize: 'vertical',
              minHeight: '150px',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(124, 58, 237, 0.2)'}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '1rem 2rem',
            background: isSubmitting 
              ? '#10b981' 
              : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: isSubmitting ? 'default' : 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => !isSubmitting && (e.target.style.transform = 'translateY(0)')}
        >
          {isSubmitting ? (
            <>
              <span style={{ 
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: '2px solid white',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Redirecionando...
            </>
          ) : (
            '📱 Enviar Mensagem via WhatsApp'
          )}
        </button>
      </form>

      {/* Instruções */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(124, 58, 237, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(124, 58, 237, 0.1)'
      }}>
        <h4 style={{
          color: 'var(--primary)',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ℹ️ Como funciona
        </h4>
        <ul style={{
          color: 'var(--text-light)',
          paddingLeft: '1.5rem',
          margin: 0,
          opacity: 0.8,
          fontSize: '0.95rem'
        }}>
          <li>Preencha seu nome e sua mensagem</li>
          <li>Clique em "Enviar Mensagem via WhatsApp"</li>
          <li>Você será redirecionado para o WhatsApp</li>
          <li>A mensagem já estará pré-preenchida para você</li>
          <li>Basta clicar em "Enviar" no WhatsApp</li>
        </ul>
      </div>
    </div>
  );
}

export default MessageForm;