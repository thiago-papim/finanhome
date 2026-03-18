/**
 * Variáveis de ambiente para o app.
 * No Create React App, o .env é lido automaticamente (não precisa de dotenv).
 * Variáveis precisam ter o prefixo REACT_APP_.
 * Reinicie o servidor (npm start) após alterar o .env.
 */
export const emailjs = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
};

export const isEmailjsConfigured = () =>
  Boolean(emailjs.serviceId && emailjs.templateId && emailjs.publicKey);

// WhatsApp
export const whatsapp = {
  // Formato aceito: qualquer coisa com DDD (ex.: "5511999999999" ou "+55 11 99999-9999")
  number: process.env.REACT_APP_WHATSAPP_NUMBER || '5511949160023',
  message: process.env.REACT_APP_WHATSAPP_MESSAGE || 'Olá! Quero simular meu crédito imobiliário.',
};

export const isWhatsappConfigured = () => Boolean(whatsapp.number);
