import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Home/Footer';

export default function Seguranca() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar ao início
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <ShieldCheckIcon className="h-10 w-10 text-blue-400" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Segurança</h1>
            <p className="text-slate-400 text-sm">Última atualização: março de 2025</p>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Compromisso com a segurança</h2>
            <p className="leading-relaxed">
              A FinanHome adota práticas e tecnologias para proteger as informações dos usuários e
              garantir a integridade das operações. Este documento descreve as medidas de segurança
              utilizadas em nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Criptografia e conexão</h2>
            <p className="leading-relaxed">
              Toda a comunicação entre seu dispositivo e nossos sistemas é realizada por meio de
              conexão criptografada (HTTPS/TLS), evitando interceptação ou alteração de dados
              durante a transmissão. Os dados sensíveis são tratados conforme as melhores práticas
              de segurança da informação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Regulamentação</h2>
            <p className="leading-relaxed">
              As operações de crédito oferecidas através da FinanHome são realizadas por
              instituições financeiras autorizadas e regulamentadas pelo Banco Central do Brasil
              (BACEN). Não realizamos concessão direta de crédito; atuamos na intermediação e na
              facilitação do processo, em conformidade com a legislação vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Proteção de dados</h2>
            <p className="leading-relaxed">
              O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados (LGPD – Lei nº
              13.709/2018). Coletamos apenas os dados necessários para a simulação e para o processo
              de crédito, e utilizamos medidas técnicas e organizacionais para protegê-los. Para
              mais detalhes, consulte nossa página de{' '}
              <Link to="/privacidade" className="text-blue-400 hover:underline">
                Privacidade
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Dúvidas</h2>
            <p className="leading-relaxed">
              Em caso de dúvidas sobre segurança ou suspeita de uso indevido de sua conta ou dados,
              entre em contato pelo e-mail contato@finanhomecred.com.br ou pelo telefone 0800 123
              4567.
            </p>
          </section>
        </div>
      </main>
      <Footer onSimulate={() => history.push('/simulador')} />
    </div>
  );
}
