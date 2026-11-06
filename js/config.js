/**
 * Configurações Centrais do Site - Ju Martins Esteticista
 * Estúdio Maria Helena Vaz (MHV) - Estética Facial
 */
const salonConfig = {
  // Identidade e Marca
  name: "Ju Martins",
  subtitle: "Estética Facial",
  salonName: "Estúdio Maria Helena Vaz",
  tagline: "Todos os cuidados para a saúde e beleza da sua pele",
  subTagline: "Tratamentos personalizados, sempre com avaliação profissional, para indicar o que realmente a sua pele precisa.",
  
  // Contato Real
  phone: "555192513647", 
  phoneDisplay: "(51) 9251-3647",
  instagramUser: "jumartins.hair",
  instagramUrl: "https://www.instagram.com/jumartins.hair/",
  salonInstagramUser: "estudiomariahelenavaz",
  salonInstagramUrl: "https://instagram.com/estudiomariahelenavaz",
  
  // Localização Real
  address: {
    street: "Av. Venâncio Aires, 464",
    complement: "Estúdio Maria Helena Vaz (MHV)",
    neighborhood: "Cidade Baixa / Farroupilha (próx. à Redenção)",
    cityState: "Porto Alegre - RS",
    cep: "90040-190",
    parkingInfo: "🚗 Estacionamentos rotativos a menos de 50m na avenida e fácil embarque/desembarque de aplicativos.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Ven%C3%A2ncio+Aires%2C+464+-+Cidade+Baixa%2C+Porto+Alegre+-+RS"
  },

  // Horários de Funcionamento Reais
  workingHours: [
    { days: "Terça a Sábado", hours: "09:00 às 18:00" },
    { days: "Domingo e Segunda", hours: "Fechado (Atendimento com hora marcada)" }
  ],

  // Mensagem padrão para agendamento geral
  defaultWhatsappMsg: "Olá, Ju Martins! Vi a publicação no Instagram e gostaria de verificar os horários disponíveis para uma avaliação facial no Estúdio Maria Helena Vaz.",

  // Configurações de Rastreamento de Tráfego Pago (Meta Ads / Google Ads)
  tracking: {
    metaPixelId: "SEU_PIXEL_ID_AQUI", // Insira seu ID numérico do Meta Pixel
    googleTagId: "G-XXXXXXXXXX",     // Insira seu ID do Google Analytics 4 ou Google Ads
    trackLeadEvent: true,             // Dispara evento 'Lead'
    currency: "BRL"
  },

  // Catálogo Oficial de Serviços & Procedimentos Faciais
  services: [
    {
      id: "limpeza-essencial",
      name: "Limpeza de Pele Essencial",
      category: "Manutenção & Viço",
      price: "R$ 150",
      priceValue: 150.00,
      vignetteIcon: "🧴",
      badge: "Cuidado Mensal",
      description: "Higienização profunda, esfoliação suave, aplicação de máscara facial nutritiva e hidratação calmante.",
      duration: "~ 1 hora",
      idealFor: "Ideal para: Manutenção rápida da pele, renovação do viço e pré-eventos.",
      whatsappMsg: "Olá, Ju! Vi a publicação no Instagram e gostaria de verificar os horários para a Limpeza de Pele Essencial (R$ 150) no Estúdio MHV."
    },
    {
      id: "limpeza-profunda",
      name: "Limpeza de Pele Profunda",
      category: "Mais Procurado ⭐",
      price: "R$ 190",
      priceValue: 190.00,
      vignetteIcon: "✨",
      badge: "Campeã de Escolha ✨",
      description: "Higienização, emoliência facilitadora, extração detalhada de cravos e miliuns sem dor, alta frequência bactericida e máscara calmante anti-inflamatória.",
      duration: "~ 1h 30m",
      idealFor: "Ideal para: Peles com cravos aparentes, oleosidade excessiva e poros dilatados.",
      whatsappMsg: "Olá, Ju! Vi o anúncio no Instagram e gostaria de agendar a Limpeza de Pele Profunda (R$ 190) no Estúdio Maria Helena Vaz."
    },
    {
      id: "limpeza-ozonio",
      name: "Limpeza Premium com Ozônio",
      category: "Tecnologia & Terapêutica",
      price: "R$ 250",
      priceValue: 250.00,
      vignetteIcon: "💨",
      badge: "Alta Performance 💨",
      description: "Protocolo completo potencializado com Vapor de Ozônio: ação antisséptica, bactericida e ultraoxigenante celular. Máscara personalizada e hidratação profunda restauradora.",
      duration: "~ 1h 45m",
      idealFor: "Ideal para: Peles acneicas, inflamações, poros congestionados e recuperação profunda.",
      whatsappMsg: "Olá, Ju! Vi o anúncio da Limpeza Premium com Vapor de Ozônio (R$ 250) e quero verificar os próximos horários no Estúdio MHV."
    },
    {
      id: "peeling-diamante",
      name: "Peeling de Diamante",
      category: "Renovação & Iluminação",
      price: "R$ 230",
      priceValue: 230.00,
      vignetteIcon: "💎",
      badge: "Pele de Porcelana ✨",
      description: "Microdermoabrasão não invasiva com esfoliação controlada, renovação celular profunda, melhora imediata da textura, viço, luminosidade e uniformidade da pele.",
      duration: "~ 1h 15m",
      idealFor: "Ideal para: Linhas finas, manchinhas solares, textura áspera e pele opaca.",
      whatsappMsg: "Olá, Ju! Vi o anúncio e gostaria de agendar o Peeling de Diamante (R$ 230) com você no Estúdio Maria Helena Vaz."
    }
  ],

  // Diferenciais do Estúdio MHV
  differentials: [
    {
      title: "Avaliação Profissional Individualizada",
      desc: "Não fazemos apenas um procedimento: analisamos o biotipo e o estado atual da sua pele para indicar exatamente o que ela necessita.",
      icon: "search"
    },
    {
      title: "Tecnologia & Vapor de Ozônio",
      desc: "Equipamentos modernos que esterilizam, oxigenam e promovem a cicatrização acelerada da pele sem agressão.",
      icon: "sparkles"
    },
    {
      title: "Localização Central em Porto Alegre",
      desc: "Na Av. Venâncio Aires, 464 (Cidade Baixa / Farroupilha), ambiente sofisticado, climatizado e acolhedor.",
      icon: "coffee"
    },
    {
      title: "Hora Marcada & Cuidado Exclusivo",
      desc: "Atendimento pontual com a esteticista Ju Martins, garantindo tempo e privacidade total para você relaxar.",
      icon: "clock"
    }
  ],

  // Depoimentos Reais
  testimonials: [
    {
      name: "Mariana Dornelles",
      service: "Limpeza de Pele Premium com Ozônio",
      rating: 5,
      text: "Fiz a limpeza com ozônio com a Ju no Estúdio Maria Helena Vaz e o resultado foi surpreendente! Minha pele ficou limpinha, sem marcas e incrivelmente macia."
    },
    {
      name: "Fernanda Silveira",
      service: "Peeling de Diamante",
      rating: 5,
      text: "O atendimento da Ju Martins é impecável! Ela explica cada etapa, tem a mão super leve e o peeling devolveu o viço que minha pele tinha perdido. Nota 10!"
    },
    {
      name: "Carla Becker",
      service: "Limpeza de Pele Profunda",
      rating: 5,
      text: "Espaço aconchegante e localização maravilhosa na Venâncio Aires. A Ju é extremamente cuidadosa e atenciosa. Já virei cliente fiel!"
    }
  ]
};
