/* eslint-disable no-unused-vars */
import React from 'react';
import { Divider } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import capa from '../imagens/capa.png';
import fundoCapa from '../imagens/fundo-capa.svg';
import bradesco from '../imagens/logos/bradesco.svg';
import cashme from '../imagens/logos/cashme.svg';
import daycoval from '../imagens/logos/daycoval.svg';
import inter from '../imagens/logos/inter.svg';
import santander from '../imagens/logos/santander.svg';
import volpi from '../imagens/logos/volpi.svg';

const arrLogos = [bradesco, cashme, daycoval, inter, santander, volpi];

export default function Home() {
  const history = useHistory();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black/1 text-[#3c3f50]">
      <img
        src={fundoCapa}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <img
        src={capa}
        alt="capa"
        className="absolute right-0 top-0 object-cover z-0 h-screen max-w-[50%] mask-gradient-top lg:flex hidden"
      />

      <Header />

      <div className="relative z-10 max-w-[1200px] px-6 w-full mx-auto h-full flex flex-col">
        <div className="flex flex-col flex-1 max-w-[700px] mt-20">
          <h1 className="font-darkerGrotesque text-[60px] leading-[1.0] font-bold mb-6">
            O crédito que você precisa, do jeito que você merece.
          </h1>
          <p className="text-[25px] text-gray-600 font-medium mb-5">
            Crédito <strong>rápido</strong>, <strong>fácil</strong> e feito pra{' '}
            <strong>você</strong>.
          </p>
          <Divider />

          <p className="text-[25px] text-gray-600 font-medium text-center mt-5">
            Plataforma multibancos
          </p>
          <div className="mt-5 flex gap-10 flex-wrap justify-center">
            {arrLogos.map((e) => (
              <img key={e} src={e} alt={e} className="h-8" />
            ))}
          </div>

          <button
            className="my-10 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-lg w-fit shadow-lg"
            onClick={() => history.push('/simulador')}
          >
            SIMULE SEU CRÉDITO GRATUITAMENTE
          </button>
        </div>
      </div>

      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">O que podemos te oferecer?</h2>
        <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto">
          {[
            {
              icon: '🏠',
              title: 'Financiamento residencial',
              desc: 'Adquira seu imóvel com condições acessíveis e parcelas que cabem no seu bolso.',
              btn: 'Simule seu financiamento',
            },
            {
              icon: '💲',
              title: 'Crédito com garantia de imóvel',
              desc: 'Use seu imóvel como garantia e tenha acesso a taxas mais baixas e prazos maiores.',
              btn: 'Simule seu crédito',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`flex-1 px-4 ${index === 1 ? 'md:pl-12 border-gray-300' : ''} relative bg-white rounded-lg shadow-xl p-5`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
              <button className="mt-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-3 py-1 rounded-lg w-fit shadow-lg">
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">O que nossos clientes dizem</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              nome: 'Mariana S.',
              texto: '“Em poucos minutos consegui simular meu financiamento. Muito simples!”',
            },
            {
              nome: 'Carlos F.',
              texto: '“Fui atendido totalmente online, sem sair de casa. Recomendo muito.”',
            },
            {
              nome: 'João P.',
              texto: '“Melhor experiência que já tive com crédito imobiliário.”',
            },
          ].map((d) => (
            <div
              key={d.nome}
              className="bg-white shadow-md p-6 rounded-xl text-left flex flex-col gap-4"
            >
              <p className="text-gray-700 italic">{d.texto}</p>
              <p className="font-bold text-blue-700">{d.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção: Parceiros */}
      {/* <section className="py-16 bg-white text-center">
        <h2 className="text-xl font-medium text-gray-600 mb-8">
          Parcerias com os principais bancos do país
        </h2>
        <div className="flex justify-center items-center gap-12 grayscale opacity-70 flex-wrap">
          {arrLogos.map((e) => (
            <img key={e} src={e} alt={e} className="h-8" />
          ))}
        </div>
      </section> */}

      {/* Seção: FAQ */}
      {/* <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Perguntas frequentes</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              pergunta: 'Preciso ter conta em algum banco específico?',
              resposta:
                'Não! Trabalhamos com várias instituições para garantir a melhor opção para você.',
            },
            {
              pergunta: 'Quanto tempo leva para o crédito cair?',
              resposta: 'Após aprovação e assinatura, o valor pode estar disponível em até 24h.',
            },
            {
              pergunta: 'O processo é 100% online?',
              resposta: 'Sim, você simula, envia os dados e assina tudo digitalmente.',
            },
          ].map((faq) => (
            <div key={faq.pergunta}>
              <h3 className="text-xl font-semibold">{faq.pergunta}</h3>
              <p className="text-gray-600 mt-2">{faq.resposta}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Rodapé */}
      {/* <footer className="bg-gray-800 text-white text-center py-6 mt-20">
        <p className="text-sm">
          © {new Date().getFullYear()} FinanHome. Todos os direitos reservados.
        </p>
      </footer> */}
    </div>
  );
}
