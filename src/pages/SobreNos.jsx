import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Home/Footer';

export default function SobreNos() {
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

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sobre nós</h1>
        <p className="text-slate-400 text-sm mb-10">Última atualização: março de 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Quem somos</h2>
            <p className="leading-relaxed">
              A FinanHome é uma plataforma especializada em soluções de crédito imobiliário e
              empréstimo com garantia de imóvel. Atuamos como intermediária entre você e
              instituições financeiras regulamentadas pelo Banco Central do Brasil, oferecendo
              simulação, análise e acompanhamento do processo de forma transparente e segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Missão</h2>
            <p className="leading-relaxed">
              Democratizar o acesso ao crédito imobiliário e ao empréstimo com garantia de imóvel,
              simplificando o processo e oferecendo condições justas, com total transparência e
              segurança jurídica para o cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Valores</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Transparência nas condições e nas taxas</li>
              <li>Segurança jurídica em todas as operações</li>
              <li>Atendimento humanizado e ágil</li>
              <li>Respeito à privacidade e à proteção de dados</li>
              <li>Compromisso com a regulamentação do Banco Central</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contato</h2>
            <p className="leading-relaxed">
              Para dúvidas sobre a FinanHome ou nossos serviços, entre em contato pelo telefone 0800
              123 4567 ou pelo e-mail contato@finanhomecred.com.br, de segunda a sexta-feira, das 9h
              às 18h.
            </p>
          </section>
        </div>
      </main>
      <Footer onSimulate={() => history.push('/simulador')} />
    </div>
  );
}
