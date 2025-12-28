// src/config.js
export const CONFIG = {
  // Dados do casal
  coupleNames: "André & Gracielli",
  startDate: new Date(2023,0,4 ), 
  weddingDate: new Date(2025, 9, 4), // 20 de outubro de 2018
  
  // Cores do tema
  colors: {
    primaryLight: "#7c3aed",
    primaryDark: "#8b5cf6",
    secondaryLight: "#db2777",
    secondaryDark: "#ec4899",
    accent: "#f59e0b",
    backgroundLight: "linear-gradient(135deg, #f9f7fe 0%, #e3f2fd 100%)",
    backgroundDark: "linear-gradient(135deg, #1e1b4b 0%, #0c0a2e 100%)",
    textLight: "#1f2937",
    textDark: "#f3f4f6"
  },
  
  // Textos personalizados
  messages: {
    title: "Nosso Amor",
    subtitle: "Uma jornada que começou em 04 de janeiro de 2023",
    dedication: `Para minha esposa maravilhosa,\n\nCada segundo ao seu lado é um presente. Este site é um pequeno reflexo de tudo que construímos juntos e do amor que só cresce a cada dia.\n\nVocê é minha inspiração, meu porto seguro e minha maior alegria. Eu te amo mais a cada dia que passa.`,
    footer: "Feito com ❤️ para a mulher da minha vida"
  },
  
  // Fotos da galeria
  photos: [
    "./../public/assets/img1.jpg",
    "./../public/assets/img2.jpg",
    "./../public/assets/img3.jpg",
    "./../public/assets/img4.jpg",
    "./../public/assets/img5.jpg",
    "./../public/assets/img7.jpg",
    "./../public/assets/img8.jpeg",
    "./../public/assets/img9.jpeg",
    "./../public/assets/img10.jpeg",
    "./../public/assets/img11.jpeg",
    "./../public/assets/img12.jpeg",
    "./../public/assets/img13.jpeg",
    "./../public/assets/img14.jpeg",
    "./../public/assets/img15.jpeg",
    "./../public/assets/img16.jpeg",
    "./../public/assets/img17.jpeg",
    "./../public/assets/img18.jpeg",
    "./../public/assets/img19.jpeg",
    "./../public/assets/img20.jpeg",
    "./../public/assets/img21.jpeg",
    "./../public/assets/img22.jpeg",
    "./../public/assets/img23.jpeg",
    "./../public/assets/img24.jpeg",
    "./../public/assets/img25.jpeg",
    "./../public/assets/img26.jpeg",
    "./../public/assets/img27.jpeg",
    "./../public/assets/img28.jpeg",
    "./../public/assets/img29.jpeg",
    "./../public/assets/img30.jpeg",
    "./../public/assets/img31.jpeg",
    "./../public/assets/img32.jpeg",
    "./../public/assets/img33.jpeg",
    "./../public/assets/img34.jpeg",
    "./../public/assets/img35.jpeg",
    "./../public/assets/img36.jpeg",
    "./../public/assets/img37.jpeg",
  ],
  
  // Linha do tempo
  timelineEvents: [
    {
      date: "04/01/2023",
      title: "Primeiro Encontro",
      description: "Nos conhecemos na calçada da sua casa, uma noite de quarta-feira.",
      icon: "☕"
    },
    {
      date: "12/06/2023",
      title: "Primeiro Dia dos Namorados",
      description: "Nossa primeira comemoração juntos.",
      icon: "🌹"
    },
    {
      date: "19/09/2025",
      title: "Nosso Casamento",
      description: "O dia mais feliz das nossas vidas! Sim para sempre.",
      icon: "💍"
    },
    {
      date: "Hoje",
      title: "Sempre Juntos",
      description: "Continuamos escrevendo nossa história, dia após dia.",
      icon: "✏️"
    }
  ],
  
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  musicTitle: "Nossa Música Especial"
};