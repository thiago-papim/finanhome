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
