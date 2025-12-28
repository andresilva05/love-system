import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Importação correta da biblioteca[citation:1][citation:6]

function QRCodeBox() {
  // Obtém a URL atual da página
  const [pageUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  });
  
  const [copied, setCopied] = useState(false);
  const qrCodeRef = useRef(null); // Ref para o elemento QR Code

  // Função para baixar o QR Code como imagem PNG
  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      // Cria um canvas temporário para renderizar o SVG e converter para PNG
      const svgElement = qrCodeRef.current.querySelector('svg');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Serializa o SVG para uma string de dados
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Cria e dispara o download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'nosso-amor-qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        URL.revokeObjectURL(url); // Limpa o objeto URL da memória
      };
      
      img.src = url;
    }
  };

  // Função para copiar a URL para a área de transferência
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      // Reseta o estado após 2 segundos
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = pageUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="qrcode-container">
      <h2>🔗 Nosso Link Especial</h2>
      <p>Compartilhe nosso amor digitalmente:</p>
      
      {/* Container do QR Code com referência para download */}
      <div className="qrcode-wrapper" ref={qrCodeRef}>
        <QRCodeSVG
          value={pageUrl} // A URL da página é o valor codificado[citation:1]
          size={200}      // Tamanho do QR Code em pixels[citation:1]
          level="H"       // Alto nível de correção de erro (até ~30%)[citation:1]
          bgColor="#FFFFFF" // Cor de fundo branca[citation:1]
          fgColor="#7c3aed" // Cor principal (roxo) para os módulos[citation:1]
          marginSize={4}  // Margem ao redor do código (módulos)[citation:1]
          title="QR Code do site Nosso Amor" // Texto para acessibilidade[citation:1]
        />
      </div>
      
      {/* Exibição da URL */}
      <div className="url-display">
        <small>{pageUrl}</small>
      </div>
      
      {/* Botões de Ação */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        flexWrap: 'wrap' 
      }}>
        <button 
          className="download-btn"
          onClick={downloadQRCode}
        >
          📥 Baixar QR Code
        </button>
        
        <button 
          className="download-btn"
          onClick={copyToClipboard}
          style={{
            background: copied ? '#10b981' : 'linear-gradient(135deg, #db2777, #be185d)'
          }}
        >
          {copied ? '✅ Copiado!' : '📋 Copiar Link'}
        </button>
      </div>
      
      <p style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
        Escaneie o código com a câmera do celular para acessar nosso site!
      </p>
    </div>
  );
}

export default QRCodeBox;